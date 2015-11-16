import { Patient, DiaperConsumption } from '../../db/models';

function serializePatient(patient) {
  const { id, firstName, lastName } = patient;
  return {
    id,
    firstName,
    lastName,
    diapers: patient.DiaperConsumptions.map(d => {
      return {
        amount: d.amount,
        type: d.DiaperTypeId,
      };
    }),
  };
}

export async function getPatients() {
  let patients = await Patient.findAll({
    include: [DiaperConsumption],
  });

  patients = patients.map(p => {
    return serializePatient(p);
  });

  return patients;
}

export async function getPatient(id) {
  const patient = await Patient.findById(id, {
    include: [DiaperConsumption],
  });

  if (!patient) {
    throw new Error('Not found');
  }

  return serializePatient(patient);
}

export async function createPatient(patientModel) {
  let patient;

  try {
    patient = await Patient.create(patientModel);
  } catch (ex) {
    const errorMessages = ex.errors.map((error) => {
      return `${error.type} : ${error.path}`;
    }).join(' : ');

    throw new Error(`${ex.name} : ${ex.message} : ${errorMessages}`);
  }

  try {
    patient.DiaperConsumptions = await DiaperConsumption.bulkCreate(
      patientModel.diapers.map((diaper) => {
        return {
          PatientId: patient.id,
          amount: diaper.amount,
          DiaperTypeId: diaper.type,
        };
      })
    );
  } catch (ex) {
    throw new Error(`${ex.name} : ${ex.message}`);
  }

  return serializePatient(patient);
}

export async function deletePatient(id) {
  const patient = await Patient.destroy({
    where: {
      id: id,
    },
  });

  if (!patient) {
    throw new Error('Nothing deleted');
  }

  return patient;
}

export async function updatePatient(id, patientModel) {
  await deletePatient(id);
  return await createPatient(patientModel);
}
