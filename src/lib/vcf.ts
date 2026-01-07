export interface ContactData {
    firstName: string;
    lastName: string;
    organization: string;
    title: string;
    emails: { value: string; type: string }[];
    phones: { value: string; type: string }[];
    address: {
        street: string;
        city: string;
        state: string;
        postalCode: string;
        country: string;
    };
    website: string;
    notes: string;
}

export function generateVCF(data: ContactData): string {
    const vcard = [
        "BEGIN:VCARD",
        "VERSION:3.0",
        `N:${data.lastName};${data.firstName};;;`,
        `FN:${data.firstName} ${data.lastName}`,
        data.organization ? `ORG:${data.organization}` : "",
        data.title ? `TITLE:${data.title}` : "",
    ];

    data.emails.forEach((email) => {
        if (email.value) {
            vcard.push(`EMAIL;TYPE=${email.type.toUpperCase()}:${email.value}`);
        }
    });

    data.phones.forEach((phone) => {
        if (phone.value) {
            vcard.push(`TEL;TYPE=${phone.type.toUpperCase()}:${phone.value}`);
        }
    });

    const addr = data.address;
    if (Object.values(addr).some((v) => v)) {
        vcard.push(
            `ADR;TYPE=HOME:;;${addr.street};${addr.city};${addr.state};${addr.postalCode};${addr.country}`
        );
    }

    if (data.website) vcard.push(`URL:${data.website}`);
    if (data.notes) vcard.push(`NOTE:${data.notes}`);

    vcard.push("END:VCARD");

    return vcard.filter(Boolean).join("\n");
}
