const ISO_COUNTRY_CODES = `AD AE AF AG AI AL AM AO AQ AR AS AT AU AW AX AZ BA BB BD BE BF BG BH BI BJ BL BM BN BO BQ BR BS BT BV BW BY BZ CA CC CD CF CG CH CI CK CL CM CN CO CR CU CV CW CX CY CZ DE DJ DK DM DO DZ EC EE EG EH ER ES ET FI FJ FK FM FO FR GA GB GD GE GF GG GH GI GL GM GN GP GQ GR GS GT GU GW GY HK HM HN HR HT HU ID IE IL IM IN IO IQ IR IS IT JE JM JO JP KE KG KH KI KM KN KP KR KW KY KZ LA LB LC LI LK LR LS LT LU LV LY MA MC MD ME MF MG MH MK ML MM MN MO MP MQ MR MS MT MU MV MW MX MY MZ NA NC NE NF NG NI NL NO NP NR NU NZ OM PA PE PF PG PH PK PL PM PN PR PS PT PW PY QA RE RO RS RU RW SA SB SC SD SE SG SH SI SJ SK SL SM SN SO SR SS ST SV SX SY SZ TC TD TF TG TH TJ TK TL TM TN TO TR TT TV TW TZ UA UG UM US UY UZ VA VC VE VG VI VN VU WF WS YE YT ZA ZM ZW`.split(' ');

const regionDisplayNames = typeof Intl !== 'undefined' && Intl.DisplayNames ? new Intl.DisplayNames(['en'], { type: 'region' }) : null;

export const countryOptions = ISO_COUNTRY_CODES.map((code) => ({
  value: code,
  label: regionDisplayNames?.of(code) || code,
})).sort((left, right) => left.label.localeCompare(right.label));

export const usAdminAreas = [
  ['AL', 'Alabama'], ['AK', 'Alaska'], ['AS', 'American Samoa'], ['AZ', 'Arizona'], ['AR', 'Arkansas'], ['CA', 'California'], ['CO', 'Colorado'], ['CT', 'Connecticut'], ['DE', 'Delaware'], ['DC', 'District of Columbia'], ['FL', 'Florida'], ['GA', 'Georgia'], ['GU', 'Guam'], ['HI', 'Hawaii'], ['ID', 'Idaho'], ['IL', 'Illinois'], ['IN', 'Indiana'], ['IA', 'Iowa'], ['KS', 'Kansas'], ['KY', 'Kentucky'], ['LA', 'Louisiana'], ['ME', 'Maine'], ['MD', 'Maryland'], ['MA', 'Massachusetts'], ['MI', 'Michigan'], ['MN', 'Minnesota'], ['MS', 'Mississippi'], ['MO', 'Missouri'], ['MT', 'Montana'], ['NE', 'Nebraska'], ['NV', 'Nevada'], ['NH', 'New Hampshire'], ['NJ', 'New Jersey'], ['NM', 'New Mexico'], ['NY', 'New York'], ['NC', 'North Carolina'], ['ND', 'North Dakota'], ['MP', 'Northern Mariana Islands'], ['OH', 'Ohio'], ['OK', 'Oklahoma'], ['OR', 'Oregon'], ['PA', 'Pennsylvania'], ['PR', 'Puerto Rico'], ['RI', 'Rhode Island'], ['SC', 'South Carolina'], ['SD', 'South Dakota'], ['TN', 'Tennessee'], ['TX', 'Texas'], ['UM', 'U.S. Minor Outlying Islands'], ['UT', 'Utah'], ['VT', 'Vermont'], ['VI', 'U.S. Virgin Islands'], ['VA', 'Virginia'], ['WA', 'Washington'], ['WV', 'West Virginia'], ['WI', 'Wisconsin'], ['WY', 'Wyoming'],
].map(([value, label]) => ({ value, label }));

export const canadaAdminAreas = [
  ['AB', 'Alberta'], ['BC', 'British Columbia'], ['MB', 'Manitoba'], ['NB', 'New Brunswick'], ['NL', 'Newfoundland and Labrador'], ['NT', 'Northwest Territories'], ['NS', 'Nova Scotia'], ['NU', 'Nunavut'], ['ON', 'Ontario'], ['PE', 'Prince Edward Island'], ['QC', 'Quebec'], ['SK', 'Saskatchewan'], ['YT', 'Yukon'],
].map(([value, label]) => ({ value, label }));

export const ukAdminAreas = [
  ['ENG', 'England'], ['SCT', 'Scotland'], ['WLS', 'Wales'], ['NIR', 'Northern Ireland'],
].map(([value, label]) => ({ value, label }));

export function adminAreasForCountry(country) {
  if (country === 'US') return usAdminAreas;
  if (country === 'CA') return canadaAdminAreas;
  if (country === 'GB') return ukAdminAreas;
  return [];
}

export const ageRangeOptions = [
  ['18_24', '18–24'], ['25_34', '25–34'], ['35_44', '35–44'], ['45_54', '45–54'], ['55_64', '55–64'], ['65_plus', '65+'],
].map(([value, label]) => ({ value, label }));

export const genderOptions = [
  ['male', 'Male'], ['female', 'Female'], ['non_binary', 'Non-binary'], ['prefer_not_to_say', 'Prefer not to say'],
].map(([value, label]) => ({ value, label }));

export const educationOptions = [
  ['less_than_high_school', 'Less than high school'],
  ['high_school_or_equivalent', 'High school diploma, GED, or equivalent'],
  ['trade_or_vocational_qualification', 'Trade, technical, or vocational qualification'],
  ['some_college_no_degree', 'Some college or university, no degree'],
  ['associate_or_short_cycle_degree', 'Associate or short-cycle tertiary degree'],
  ['bachelors_degree', 'Bachelor’s degree'],
  ['masters_degree', 'Master’s degree'],
  ['professional_or_doctorate_degree', 'Professional or doctorate degree'],
  ['prefer_not_to_say', 'Prefer not to say'],
].map(([value, label]) => ({ value, label }));

export const employmentOptions = [
  ['employed_full_time', 'Employed full-time'], ['employed_part_time', 'Employed part-time'], ['self_employed', 'Self-employed'], ['unemployed_looking', 'Unemployed and actively looking for work'], ['student', 'Student'], ['retired', 'Retired'], ['homemaker_or_caregiver', 'Homemaker or caregiver'], ['unable_to_work', 'Unable to work'], ['prefer_not_to_say', 'Prefer not to say'],
].map(([value, label]) => ({ value, label }));

export const industryOptions = [
  ['technology_and_telecommunications', 'Technology and telecommunications'], ['healthcare_and_social_assistance', 'Healthcare and social assistance'], ['education', 'Education'], ['retail_and_ecommerce', 'Retail and e-commerce'], ['finance_insurance_and_real_estate', 'Finance, insurance, and real estate'], ['manufacturing_and_construction', 'Manufacturing and construction'], ['government_and_public_services', 'Government and public services'], ['transportation_and_logistics', 'Transportation and logistics'], ['hospitality_food_and_leisure', 'Hospitality, food, and leisure'], ['professional_and_business_services', 'Professional and business services'], ['other_industry', 'Other'], ['prefer_not_to_say', 'Prefer not to say'],
].map(([value, label]) => ({ value, label }));

export const maritalStatusOptions = [
  ['never_married', 'Single, never married'], ['married_or_domestic_partnership', 'Married or in a domestic partnership'], ['separated', 'Separated'], ['divorced', 'Divorced'], ['widowed', 'Widowed'], ['prefer_not_to_say', 'Prefer not to say'],
].map(([value, label]) => ({ value, label }));

export const childrenOptions = [
  ['yes', 'Yes'], ['no', 'No'], ['prefer_not_to_say', 'Prefer not to say'],
].map(([value, label]) => ({ value, label }));

export const childrenAgeBandOptions = [
  ['under_6', 'Under 6'], ['6_12', '6–12'], ['13_17', '13–17'], ['18_plus_at_home', '18+ living at home'], ['prefer_not_to_say', 'Prefer not to say'],
].map(([value, label]) => ({ value, label }));

export const householdIncomeOptions = [
  ['under_25000', 'Under $25,000'], ['25000_49999', '$25,000–$49,999'], ['50000_74999', '$50,000–$74,999'], ['75000_99999', '$75,000–$99,999'], ['100000_149999', '$100,000–$149,999'], ['150000_199999', '$150,000–$199,999'], ['200000_plus', '$200,000+'], ['prefer_not_to_say', 'Prefer not to say'],
].map(([value, label]) => ({ value, label }));

export const employedStatusValues = new Set(['employed_full_time', 'employed_part_time', 'self_employed']);
