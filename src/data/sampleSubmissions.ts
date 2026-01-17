// Sample submission data for the demo

export const homeownersSubmission = {
  submission: {
    id: 'SUB-2026-001847',
    type: 'new-business',
    lineOfBusiness: 'homeowners',
    receivedAt: '2026-01-17T09:14:23Z',
    source: 'agency-portal',
    applicant: {
      name: 'Jennifer & Michael Chen',
      email: 'jchen@email.com',
      phone: '415-555-0847',
    },
    property: {
      address: '1847 Oak Valley Drive, Walnut Creek, CA 94596',
      yearBuilt: 2019,
      squareFeet: 2400,
      constructionType: 'frame',
      roofType: 'composition-shingle',
      roofAge: 5,
      protectionClass: 4,
      distanceToFireStation: 2.3,
      distanceToHydrant: 0.2,
    },
    coverageRequested: {
      dwellingLimit: 485000,
      personalProperty: 242500,
      liability: 300000,
      medicalPayments: 5000,
      deductible: 1000,
    },
    priorInsurance: {
      carrier: 'State Farm',
      policyNumber: '23-HO-847293',
      expirationDate: '2026-02-15',
      yearsWithCarrier: 3,
      claims: [
        {
          date: '2019-11-15',
          type: 'water-damage',
          amount: 12400,
          status: 'closed',
        },
      ],
    },
    discounts: {
      multiPolicy: true,
      newHome: true,
      protectiveDevices: ['burglar-alarm', 'smoke-detectors', 'deadbolts'],
      claimFree: false,
    },
  },
  thirdPartyData: {
    coreLogic: {
      replacementCostEstimate: 485000,
      landValue: 350000,
      propertyCharacteristics: {
        stories: 2,
        garage: 'attached-2car',
        pool: false,
        trampoline: false,
      },
    },
    lexisNexis: {
      clueReport: {
        totalClaims: 1,
        claims: [
          {
            date: '2019-11-15',
            type: 'water',
            amount: 12400,
            property: '1847 Oak Valley Drive',
          },
        ],
      },
    },
    verisk: {
      fireProtectionClass: 4,
      isoTerritory: '023',
    },
  },
};

export const autoEndorsement = {
  endorsement: {
    id: 'END-2026-003921',
    type: 'add-driver',
    policyNumber: 'AUTO-2025-887432',
    requestedAt: '2026-01-17T10:32:15Z',
    requestSource: 'email',
    requestText:
      'Please add driver to policy AUTO-2025-887432: Name: Tyler Johnson, DOB: 03/15/2009, License: CA D4892718',
    newDriver: {
      name: 'Tyler Johnson',
      dateOfBirth: '2009-03-15',
      licenseNumber: 'CA D4892718',
      licenseState: 'CA',
      relationship: 'child',
    },
    currentPolicy: {
      vehicles: [
        {
          vin: '1HGBH41JXMN109186',
          year: 2021,
          make: 'Honda',
          model: 'Accord',
          use: 'commute',
        },
        {
          vin: '2C3CDXCT8KH512847',
          year: 2019,
          make: 'Honda',
          model: 'Civic',
          use: 'pleasure',
        },
      ],
      drivers: [
        {
          name: 'Robert Johnson',
          dateOfBirth: '1978-06-22',
          relationship: 'insured',
        },
        {
          name: 'Sarah Johnson',
          dateOfBirth: '1980-09-14',
          relationship: 'spouse',
        },
      ],
      currentPremium: 2847,
    },
    mvrData: {
      status: 'valid',
      issueDate: '2025-05-20',
      expirationDate: '2030-03-15',
      violations: [],
      accidents: [],
      suspensions: [],
    },
    goodStudentVerification: {
      school: 'Northgate High School',
      gpa: 3.4,
      verified: true,
    },
    driverTraining: {
      completed: true,
      provider: 'AAA Teen Driver',
      completionDate: '2025-04-12',
    },
  },
};

// Sample ACORD 80 fields for extraction demo
export const acordFields = [
  { field: 'Named Insured', value: 'Jennifer & Michael Chen', confidence: 99.2 },
  { field: 'Mailing Address', value: '1847 Oak Valley Drive', confidence: 98.8 },
  { field: 'City, State, ZIP', value: 'Walnut Creek, CA 94596', confidence: 99.1 },
  { field: 'Phone Number', value: '(415) 555-0847', confidence: 97.5 },
  { field: 'Email', value: 'jchen@email.com', confidence: 99.8 },
  { field: 'Policy Type', value: 'HO-3', confidence: 99.9 },
  { field: 'Location Address', value: '1847 Oak Valley Drive', confidence: 98.8 },
  { field: 'Year Built', value: '2019', confidence: 98.2 },
  { field: 'Construction Type', value: 'Frame', confidence: 97.8 },
  { field: 'Roof Type', value: 'Composition Shingle', confidence: 96.5 },
  { field: 'Square Footage', value: '2,400', confidence: 95.2 },
  { field: 'Number of Stories', value: '2', confidence: 99.1 },
  { field: 'Dwelling Coverage', value: '$485,000', confidence: 99.5 },
  { field: 'Personal Property', value: '$242,500', confidence: 99.4 },
  { field: 'Liability', value: '$300,000', confidence: 99.6 },
  { field: 'Medical Payments', value: '$5,000', confidence: 99.7 },
  { field: 'Deductible', value: '$1,000', confidence: 99.8 },
  { field: 'Prior Carrier', value: 'State Farm', confidence: 98.3 },
  { field: 'Prior Policy Number', value: '23-HO-847293', confidence: 97.9 },
  { field: 'Years with Prior Carrier', value: '3', confidence: 96.8 },
  { field: 'Burglar Alarm', value: 'Yes', confidence: 95.5 },
  { field: 'Smoke Detectors', value: 'Yes', confidence: 98.2 },
  { field: 'Deadbolt Locks', value: 'Yes', confidence: 94.8 },
];
