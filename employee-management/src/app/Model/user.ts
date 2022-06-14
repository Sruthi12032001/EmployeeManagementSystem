export class User {
    id?: string
    first_name!: string
    last_name!: string
    age!: number
    email_id!: string
    password!: string
    employee_type!: string
    address!: string
    pin_code!: string
    name?: string
    nameWithoutSpace?: string
}

export class Login {
    email_id!: string;
    password!: string;
}
