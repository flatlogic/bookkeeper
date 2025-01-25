import React from 'react';
import {
    QuestionAnswer as SupportIcon,
    LibraryBooks as LibraryIcon,
    HelpOutline as FAQIcon,
} from '@material-ui/icons';

import TableIcon from './components/icons/TableIcon';
import UIicon from './components/icons/UIicon';
import FormsIcon from './components/icons/FormsIcon';
import ChartsIcon from './components/icons/ChartsIcon';
import MapIcon from './components/icons/MapIcon';
import ExtraIcon from './components/icons/ExtraIcon';
import MenuIcon from './components/icons/MenuIcon';
import CoreIcon from './components/icons/CoreIcon';
import DescriptionIcon from '@material-ui/icons/Description';


import { TEMPLATE_ROUTES } from '../../../config';

// components
import Dot from '../../../components/common/Sidebar/components/Dot';

const structure = [
    { id: 59012, type: 'divider' },
    { id: 5, type: 'title', label: 'TEMPLATE' },
    {
        id: 781231,
        label: 'Documentation',
        link: TEMPLATE_ROUTES.documentation,
        icon: <DescriptionIcon />,
        children: [
            {
                label: 'Overview',
                link: TEMPLATE_ROUTES.documentationOverview,
            },
            {
                label: 'Quick Start',
                link: TEMPLATE_ROUTES.documentationQuickStart,
            },
            {
                label: 'Pages',
                link: TEMPLATE_ROUTES.documentationPages,
            },
            {
                label: 'Typography',
                link: TEMPLATE_ROUTES.documentationComponentsTypography,
            },
            {
                label: 'Widget',
                link: TEMPLATE_ROUTES.documentationComponentsWidget,
            },
            {
                label: 'Header',
                link: TEMPLATE_ROUTES.documentationComponentsHeader,
            },
            {
                label: 'Sidebar',
                link: TEMPLATE_ROUTES.documentationComponentsSidebar,
            },
            {
                label: 'Buttons',
                link: TEMPLATE_ROUTES.documentationComponentsButtons,
            },
            {
                label: 'Libs',
                link: TEMPLATE_ROUTES.documentationLibs,
            },
            {
                label: 'Licences',
                link: TEMPLATE_ROUTES.documentationLicences,
            },
        ],
    },
    {
      id: 6,
      label: 'Core',
      link: TEMPLATE_ROUTES.typography,
      icon: <CoreIcon />,
      children: [
          {
              label: 'Typography',
              link: TEMPLATE_ROUTES.typography,
          },
          {
              label: 'Colors',
              link: TEMPLATE_ROUTES.colors,
          },
          {
              label: 'Grid',
              link: TEMPLATE_ROUTES.grid,
          },
      ],
  },
  {
      id: 7,
      label: 'Tables',
      link: TEMPLATE_ROUTES.tablesBasic,
      icon: <TableIcon />,
      children: [
          { label: 'Tables Basic', link: TEMPLATE_ROUTES.tablesBasic },
          {
              label: 'Tables Dynamic',
              link: TEMPLATE_ROUTES.tablesDynamic,
          },
      ],
  },
  {
      id: 8,
      label: 'UI Elements',
      link: TEMPLATE_ROUTES.icons,
      icon: <UIicon />,
      children: [
          { label: 'Icons', link: TEMPLATE_ROUTES.icons },
          { label: 'Badge', link: TEMPLATE_ROUTES.badge },
          { label: 'Carousel', link: TEMPLATE_ROUTES.carousel },
          { label: 'Cards', link: TEMPLATE_ROUTES.cards },
          { label: 'Modal', link: TEMPLATE_ROUTES.modal },
          {
              label: 'Notifications',
              link: TEMPLATE_ROUTES.notifications,
          },
          { label: 'Navbar', link: TEMPLATE_ROUTES.navbar },
          { label: 'Tooltips', link: TEMPLATE_ROUTES.tooltips },
          { label: 'Tabs', link: TEMPLATE_ROUTES.tabs },
          { label: 'Pagination', link: TEMPLATE_ROUTES.tablesDynamic },
          { label: 'Progress', link: TEMPLATE_ROUTES.progress },
          { label: 'Widget', link: TEMPLATE_ROUTES.widget },
      ],
  },
  {
      id: 9,
      label: 'Forms',
      link: TEMPLATE_ROUTES.formsElements,
      icon: <FormsIcon />,
      children: [
          { label: 'Form Elements', link: TEMPLATE_ROUTES.formsElements },
          { label: 'Form Validation', link: TEMPLATE_ROUTES.formsValidation },
      ],
  },
  {
      id: 10,
      label: 'Charts',
      link: TEMPLATE_ROUTES.chartsOverview,
      icon: <ChartsIcon />,
      children: [
          { label: 'Charts Overview', link: TEMPLATE_ROUTES.chartsOverview },
          { label: 'Line Charts', link: TEMPLATE_ROUTES.chartsLine },
          { label: 'Bar Charts', link: TEMPLATE_ROUTES.chartsBar },
          { label: 'Pie Charts', link: TEMPLATE_ROUTES.chartsPie },
      ],
  },
  {
      id: 11,
      label: 'Maps',
      link: TEMPLATE_ROUTES.googleMap,
      icon: <MapIcon />,
      children: [
          { label: 'Google Maps', link: TEMPLATE_ROUTES.googleMap },
          { label: 'Vector Map', link: TEMPLATE_ROUTES.vectorMap },
      ],
  },
  {
      id: 12,
      label: 'Extra',
      link: TEMPLATE_ROUTES.calendar,
      icon: <ExtraIcon />,
      children: [
          { label: 'Calendar', link: TEMPLATE_ROUTES.calendar },
          { label: 'Invoice', link: TEMPLATE_ROUTES.invoice },
          { label: 'Login Page', link: TEMPLATE_ROUTES.loginPage },
          { label: 'Error Page', link: TEMPLATE_ROUTES.errorPage },
          { label: 'Gallery', link: TEMPLATE_ROUTES.gallery },
          { label: 'Search Result', link: TEMPLATE_ROUTES.searchResult },
          { label: 'Time Line', link: TEMPLATE_ROUTES.timeLine },
      ],
  },
  {
      id: 13,
      label: 'Menu Levels',
      icon: <MenuIcon />,
      children: [
          { label: 'Level 1.1' },
          {
              label: 'Level 1.2',
              type: 'nested',
              children: [
                  { label: 'Level 2.1' },
                  {
                      label: 'Level 2.2',
                      children: [
                          {
                              label: 'Level 3.1',
                          },
                      ],
                  },
              ],
          },
      ],
  },
  { id: 14, type: 'divider' },
  { id: 15, type: 'title', label: 'HELP' },
  { id: 16, label: 'Library', icon: <LibraryIcon /> },
  { id: 17, label: 'Support', icon: <SupportIcon /> },
  { id: 18, label: 'FAQ', icon: <FAQIcon /> },
  { id: 19, type: 'divider' },
]

export default structure
