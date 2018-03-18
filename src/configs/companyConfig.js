const local=window.localStorage
const company =JSON.parse(local.getItem("companyInfo"));


export var companyInfo = {
    company_name:company ? company.company_name : 'fake company',
    secret:company ? company.secret : 'fake secret',
    // company_id:'5a731947d85171040bff1d6e',
    company_id: company ? company.id : 'fake id',
    // company_id:'5a8cd83b3b99a3fd79cee670',
    // company_id:'5a73daab92b2659c26c0afdc',

}