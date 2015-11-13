import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Card, CardHeader, Avatar } from 'material-ui';
import Radium, { Style } from 'radium';

import DiapersOrder from '../../components/DiapersOrder';

import styles from './styles';

import * as PatientsAction from '../../actions/patients';

function mapStateToProps(state) {
  return {
    patients: state.patients,
  };
}

/**
 * We bind actions to the component props.
 * These actions are used to dispatch an action to the redux store.
 */
function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    ...PatientsAction,
  }, dispatch);
}

@Radium
@connect(mapStateToProps, mapDispatchToProps)
export default class ExportPage extends Component {
  static propTypes = {
    patients: PropTypes.object.isRequired,
    fetchPatients: PropTypes.func.isRequired,
  }

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
            <DiapersOrder {...this.props} />
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
