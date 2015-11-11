import React, { Component } from 'react';
import { Card, CardHeader, Avatar } from 'material-ui';

import PatientsTable from '../../components/PatientsTable';
import PatientInput from '../../components/PatientInput';

import './SaisiePage.css';

export default class SaisiePage extends Component {
  render() {
    return (
      <div className="layout vertical">
        <Card className="padded">
          <CardHeader
            title="Saisie"
            subtitle="Entrer un nouveau resident"
            avatar={<Avatar>1</Avatar>}/>
          <PatientInput {...this.props} />
        </Card>
        <Card className="padded">
          <CardHeader
            title="Visualisation"
            subtitle="Liste des couches utilisées pour chaque résident"
            avatar={<Avatar>2</Avatar>}/>
          <PatientsTable className="flex" {...this.props} />
        </Card>
      </div>
    );
  }
}
