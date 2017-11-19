

export interface Patient {
    firstname: string,
    lastname: string,
    street:string,
    zip: string,
    city: string,
    bold: string,
    birthdate: string,
    url }

export interface PatientId extends Patient { id: string; }

export interface communication {
    email: string,
    phone: string
}

