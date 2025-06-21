export interface MemberData {
    yearOfBirth?: string;
    recentAssessableIncome?: string;
    cpfMediSaveBalance?: string;
    isThirdOrSubsequentChild?: string;
}

export interface ExpectedResult {
    type : string,
    individualBenefits : string
}

export interface SchemesData {
    yearOfBirth: string;
    recentAssessableIncome: string;
    housingType: string;
    propertyOwnership: string;
    ownMoreThanOneProperty: string;
    member_1?: MemberData;
    member_2?: MemberData;
    member_3?: MemberData;
    expectedResult: ExpectedResult;
}

export interface testData {
    schemes : {
        [key : string] : SchemesData;
    }
}