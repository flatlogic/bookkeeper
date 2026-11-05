const { test, expect } = require('@playwright/test');

test('login, accounting organizations, table controls, charts, calendar, maps and logout work', async ({ page }) => {
  test.setTimeout(90000);
  const errors = [];
  page.on('pageerror', error => { errors.push(error.message); console.error(error); });
  const user = { id: 1, username: 'superUser', firstName: 'Ada', lastName: 'Lovelace', email: 'admin@example.test', roles: ['SUPER_USER'], companyRoles: [], lastCompanySelected: null };
  let organizations = [{ id: 1, name: 'Fixture Organization', description: 'Accounting fixture', physicalAddress: null, mailingAddress: null, users: [] }];
  const writes = [];
  await page.route(url => url.pathname.startsWith('/api/'), async route => {
    const request = route.request();
    const url = new URL(request.url());
    const method = request.method();
    let data;
    if (method === 'OPTIONS') data = {};
    else if (url.pathname === '/api/login') data = { user, token: 'fixture-token' };
    else if (url.pathname === '/api/admin/companies') data = [];
    else if (url.pathname === '/api/admin/organizations/check-name') data = {};
    else if (url.pathname === '/api/admin/organizations' && method === 'GET') data = organizations;
    else if (url.pathname === '/api/admin/organizations' && method === 'POST') {
      data = { ...request.postDataJSON(), id: 2, users: [] }; organizations.push(data); writes.push({ method, data });
    } else if (/\/api\/admin\/organizations\/\d+$/.test(url.pathname)) {
      const id = Number(url.pathname.split('/').pop());
      if (method === 'GET') data = organizations.find(org => org.id === id);
      else if (method === 'PUT') { data = { ...request.postDataJSON(), id }; organizations = organizations.map(org => org.id === id ? data : org); writes.push({ method, data }); }
      else if (method === 'DELETE') { organizations = organizations.filter(org => org.id !== id); data = {}; writes.push({ method, id }); }
      else throw new Error(`Unexpected method: ${method} ${url.pathname}`);
    } else throw new Error(`Unexpected API: ${method} ${url.pathname}`);
    await route.fulfill({ json: data, headers: { 'access-control-allow-origin': 'http://127.0.0.1:4311', 'access-control-allow-credentials': 'true', 'access-control-allow-headers': 'authorization,content-type', 'access-control-allow-methods': 'GET,POST,PUT,DELETE,OPTIONS' } });
  });
  await page.goto('/');
  await page.getByPlaceholder('Enter your username').fill('superUser');
  await page.getByPlaceholder('Enter your password here').fill('test-password');
  await page.getByRole('button', { name: 'Login', exact: true }).click();
  await expect(page).toHaveURL(/#\/app\/dashboard$/);
  await expect(page.locator('.apexcharts-bar-area').first()).toBeVisible();

  await page.goto('/#/admin/organizations');
  await expect(page.getByRole('cell', { name: 'Fixture Organization', exact: true })).toBeVisible();
  await page.getByRole('button', { name: 'Add Organization', exact: true }).click();
  await page.locator('#name').fill('A');
  await page.locator('#name').blur();
  await expect(page.getByRole('button', { name: 'Apply Changes', exact: true })).toBeDisabled();
  await page.locator('#name').fill('Regression Organization');
  await page.locator('#description').fill('Created by browser regression');
  await page.locator('#description').blur();
  await page.getByRole('button', { name: 'Apply Changes', exact: true }).click();
  await expect(page.getByRole('cell', { name: 'Regression Organization', exact: true })).toBeVisible();
  expect(writes[0].data.name).toBe('Regression Organization');
  await page.getByRole('cell', { name: 'Regression Organization', exact: true }).click();
  await page.locator('#description').fill('Updated by browser regression');
  await page.locator('#description').blur();
  await page.getByRole('button', { name: 'Apply Changes', exact: true }).click();
  await expect(page.getByRole('cell', { name: 'Updated by browser regression', exact: true })).toBeVisible();
  expect(writes.find(write => write.method === 'PUT').data.description).toBe('Updated by browser regression');
  await page.getByRole('row').filter({ hasText: 'Regression Organization' }).getByRole('checkbox').check();
  await page.getByRole('button', { name: 'Delete', exact: true }).click();
  await expect(page.getByText('Confirm delete Organization', { exact: true })).toBeVisible();
  await page.getByRole('button', { name: 'Delete', exact: true }).last().click();
  await expect(page.getByRole('cell', { name: 'Regression Organization', exact: true })).toHaveCount(0);
  expect(writes.find(write => write.method === 'DELETE').id).toBe(2);

  await page.goto('/#/template/tables/static');
  const employees = page.getByRole('grid', { name: 'Employee List' });
  await expect(employees.getByText('Joe James', { exact: true })).toBeVisible();
  await page.getByRole('button', { name: 'Search', exact: true }).click();
  await page.getByRole('textbox', { name: 'Search' }).fill('Joe James');
  await expect(employees.locator('tbody tr')).toHaveCount(1);
  await page.getByRole('textbox', { name: 'Search' }).fill('');
  await page.getByRole('textbox', { name: 'Search' }).press('Escape');
  await employees.getByRole('button', { name: 'Name', exact: true }).click();
  await expect(employees.locator('tbody tr').first()).toContainText('Anna Siranush');
  await page.getByRole('button', { name: 'Next Page', exact: true }).first().click();
  await expect(employees.locator('tbody')).toContainText('Kaui Ignace');
  await page.getByRole('button', { name: 'Previous Page', exact: true }).first().click();
  await employees.locator('tbody input[type="checkbox"]').first().check();
  await expect(page.getByText('1 row(s) selected')).toBeVisible();
  await employees.locator('tbody input[type="checkbox"]').first().uncheck();
  await page.getByRole('button', { name: 'View Columns', exact: true }).click();
  await page.getByRole('checkbox', { name: 'Company', exact: true }).uncheck();
  await page.keyboard.press('Escape');
  await expect(employees.getByRole('columnheader', { name: 'Company', exact: true })).toHaveCount(0);
  await page.getByRole('button', { name: 'Filter Table', exact: true }).click();
  await page.getByRole('checkbox', { name: 'Dallas', exact: true }).check();
  await page.keyboard.press('Escape');
  await expect(employees.locator('tbody tr')).toHaveCount(3);
  await expect(employees.locator('tbody')).toContainText('James Houston');

  await page.goto('/#/template/tables/dynamic');
  await page.getByRole('checkbox', { name: 'select all desserts' }).check();
  await expect(page.getByText('13 selected', { exact: true })).toBeVisible();
  await page.getByRole('checkbox', { name: 'select all desserts' }).uncheck();
  await page.getByRole('button', { name: /^Calories/ }).first().click();
  await page.getByRole('button', { name: 'next page', exact: true }).first().click();
  await expect(page.getByText('6-10 of 13', { exact: true }).first()).toBeVisible();

  await page.goto('/#/template/charts/overview');
  await expect(page.locator('.apexcharts-svg').first()).toBeVisible();
  await expect(page.locator('.recharts-pie-sector path').first()).toBeVisible();
  await page.goto('/#/template/extra/calendar');
  await expect(page.locator('.fc-daygrid-day').first()).toBeVisible();
  await page.goto('/#/template/maps/vector');
  await expect(page.locator('.rsm-geography').first()).toBeVisible();
  await expect(page.locator('.rsm-geography').first()).toHaveCSS('fill', 'rgb(209, 231, 255)');
  await expect(page.getByText('Buenos Aires', { exact: true })).toBeVisible();
  await page.screenshot({ path: 'test-results/bookkeeper-map.png' });
  await page.goto('/#/logout');
  await expect(page.getByPlaceholder('Enter your username')).toBeVisible();
  expect(errors).toEqual([]);
});
