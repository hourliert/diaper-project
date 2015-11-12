import React, { Component } from 'react';
import { Card, CardHeader, Avatar } from 'material-ui';
import Radium, { Style } from 'radium';

import DiapersOrder from '../../components/DiapersOrder';

import styles from './styles';

@Radium
export default class ExportPage extends Component {
  render() {
    return (
      <div className="layout vertical">
        <Style rules={styles}/>
        <div style={[styles.padded]}>
          <Card className="padded">
            <CardHeader
              title="Export"
              subtitle="Quantités de couches consommées"
              avatar={<Avatar>3</Avatar>}/>
            <DiapersOrder />
          </Card>
        </div>
        <div style={[styles.padded]}>
          <Card className="padded">
            <CardHeader
              title="Commande"
              subtitle="Cartons à commander"
              avatar={<Avatar>4</Avatar>}/>
            <div>Couches par carton + Commande</div>
          </Card>
        </div>
      </div>
    );
  }
}
