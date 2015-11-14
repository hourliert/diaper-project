import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Card, CardHeader, Avatar } from 'material-ui';

import CardsList from '../../components/CardsList';
import DiapersTable from '../../components/DiapersTable';

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

@connect(mapStateToProps, mapDispatchToProps)
export default class ExportPage extends Component {
  static propTypes = {
    patients: PropTypes.object.isRequired,

    fetchPatients: PropTypes.func.isRequired,
  }

  render() {
    const { patients, fetchPatients } = this.props;

    return (
      <CardsList>
        <Card className="padded">
          <CardHeader
            title="Export"
            subtitle="Quantités de couches consommées"
            avatar={<Avatar>3</Avatar>}/>
          <DiapersTable
            patients={patients.data}
            onMount={fetchPatients}/>
        </Card>
        <Card className="padded">
          <CardHeader
            title="Commande"
            subtitle="Cartons à commander"
            avatar={<Avatar>4</Avatar>}/>
          <div>Temporaire. En cours de réalisation.</div>
        </Card>
      </CardsList>
    );
  }
}
