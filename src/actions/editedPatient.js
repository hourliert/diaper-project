export const EDIT_PATIENT = 'EDIT_PATIENT';
export function editPatient(patient) {
  return {
    type: EDIT_PATIENT,
    payload: patient,
  };
}

export const CANCEL_EDITION = 'CANCEL_EDITION';
export function cancelEdition() {
  return {
    type: CANCEL_EDITION,
  };
}
