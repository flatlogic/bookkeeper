import React from 'react';

import Input from '../../common/Input';
import Typography from '../../common/Typography';
import Card from '../../common/Card';
import { getError } from '../../../services/form';

export default function AddressForm ({label, fieldsGroupName, data, onChange, validate, errors}) {
  const fieldsData = data || {};

  return (
    <Card>
      <Typography>{label}</Typography>
      <Input
        id="street"
        name={`${fieldsGroupName}.street`}
        label="Street"
        value={fieldsData.street}
        onChange={onChange}
        onBlur={validate}
        error={getError(errors, `${fieldsGroupName}.street`)}
        required
      />
      <Input
        id="city"
        name={`${fieldsGroupName}.city`}
        label="City"
        value={fieldsData.city}
        onChange={onChange}
        onBlur={validate}
        error={getError(errors, `${fieldsGroupName}.city`)}
        required
      />
      <Input
        id="state"
        name={`${fieldsGroupName}.state`}
        label="State"
        value={fieldsData.state}
        onChange={onChange}
        onBlur={validate}
        error={getError(errors, `${fieldsGroupName}.state`)}
        required
      />
      <Input
        id="zip"
        name={`${fieldsGroupName}.zipCode`}
        label="Zip"
        value={fieldsData.zipCode}
        onChange={onChange}
        onBlur={validate}
        error={getError(errors, `${fieldsGroupName}.zipCode`)}
        required
      />
      <Input
        id="phone"
        name={`${fieldsGroupName}.phone`}
        label="Phone"
        value={fieldsData.phone}
        onChange={onChange}
        onBlur={validate}
        error={getError(errors, `${fieldsGroupName}.phone`)}
        mask="999-999-9999"
      />
    </Card>
  );
};