export enum LowIncome {
    yearOfBirth = "1990",
    recentAssessableIncome = "Between $34,001 and $100,000",
    housingType = "1-room flat",
    propertyOwnership = "Owned by me or household member",
    ownMoreThanOneProperty = "No",
    member = "Member 1",
    mem_yearOfBirth = "2000",
    mem_recentAssessableIncome = "$34,000 and below or No income",
    type = "low_benefits",
    schemes = "Family with low total income",
    individualBenefits = "35 years old (in 2025), Assessable Income between $34,001 and $100,000"
};

export enum ElderHouseHold {
    yearOfBirth = "1990",
    recentAssessableIncome = "Above $100,000",
    housingType = "2-room flat",
    propertyOwnership = "Rented from Open market",
    ownMoreThanOneProperty = "No",
    member = "Member 1",
    mem_yearOfBirth = "1960",
    mem_recentAssessableIncome = "$34,000 and below or No income",
    mem_cpfMediSaveBalance = "Less than $37,750",
    type = "support_benefits",
    schemes = "Family having elderly person",
    individualBenefits = "35 years old (in 2025), Assessable Income above $100,000"
}

export enum ManyChildren {
    yearOfBirth = "1985",
    recentAssessableIncome = "Above $100,000",
    housingType = "Executive/Multi-Generation flat",
    propertyOwnership = "Rented from HDB",
    ownMoreThanOneProperty = "Yes",
    member_1 = "Member 1",
    mem_1_yearOfBirth = "2010",
    member_2 = "Member 2",
    mem_2_yearOfBirth = "2020",
    mem_2_isThirdOrSubsequentChild = "Yes",
    // member_3 = "Member 3",
    // mem_3_yearOfBirth = "2022",
    // mem_3_isThirdOrSubsequentChild = "Yes",
    type = "minimal_benefits",
    schemes = "Family having many childrens",
    individualBenefits = "40 years old (in 2025), Assessable Income above $100,000"
}

export enum YoungHouseHold {
    yearOfBirth = "1995",
    recentAssessableIncome = "Above $100,000",
    housingType = "3-room flat",
    propertyOwnership = "Owned by me or household member",
    ownMoreThanOneProperty = "No",
    type = "limited_benefits",
    schemes = "Financial plan for Young people",
    individualBenefits = "30 years old (in 2025), Assessable Income above $100,000"
}