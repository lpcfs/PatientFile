

export interface Patient {
    name: string,
    firstname: string,
    lastname: string,
    street: string,
    zip: string,
    city: string,
    bold: string,
    birthdate: string,
    url: any
}

export interface PatientId extends Patient { id: string; }

export interface communication {

    comm: {
        email: string,
        phone: string
    }

}

