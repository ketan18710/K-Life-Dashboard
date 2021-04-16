/**
 * @description Validation helpers deals with all types of in app validation
 */

import { FORM_ERROR_MESSAGES} from 'utils/constants';
const errorValidation = {};

const ValidationHelpers = {
  isRequired: value => {
    if (value===null) return FORM_ERROR_MESSAGES.REQUIRED_MESSAGE;
    if (value==="null") return FORM_ERROR_MESSAGES.REQUIRED_MESSAGE;
    if (value===undefined) return FORM_ERROR_MESSAGES.REQUIRED_MESSAGE;
    if (typeof value === 'number' || typeof value === 'boolean') {
      return value ? null : FORM_ERROR_MESSAGES.REQUIRED_MESSAGE;
    }
    return value.trim().length > 0
      ? null
      : FORM_ERROR_MESSAGES.REQUIRED_MESSAGE;
  },
  isEmpty: value => {
    if (value && value.length >0) {
      return null;
    }
    return FORM_ERROR_MESSAGES.REQUIRED_MESSAGE;
  },
  checkEmail: value => {
    const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (value && !regex.test(String(value).toLowerCase())) {
      return FORM_ERROR_MESSAGES.INVALID_EMAIL_ADDRESS;
    }
    return null;
  },
  checkFullName: value => {
    const regex = /[a-zA-Z0-9'-]\s{0,}/;
    if (value && !regex.test(String(value).toLowerCase())) {
      return FORM_ERROR_MESSAGES.INVALID_NAME;
    }
    return null;
  },
  checkFirstName : value =>{
    const regex = /^[a-zA-Z\s]{0,30}$/;
    if (value && !regex.test(String(value).toLowerCase())) {
      return FORM_ERROR_MESSAGES.INVALID_NAME;
    }
    return null;
  },
  checkPhoneNumber: value =>{
    const regex = /^[0-9]{0,12}$/;
    if (value && !regex.test(String(value).toLowerCase())) {
      return FORM_ERROR_MESSAGES.INVALID_NUMBER;
    }
    return null;
  },
  checkNumber : value =>{
    const regex = /^[0-9]{0,}$/;
    if (value && !regex.test(String(value).toLowerCase())) {
      return FORM_ERROR_MESSAGES.INVALID_INPUT;
    }
    return null;
  },
  checkImageFile : value =>{
    const regex = /.(gif|jpe?g|tiff?|png|webp|bmp)$/i;
    if (value && !regex.test(String(value).toLowerCase())) {
      return FORM_ERROR_MESSAGES.INVALID_INPUT;
    }
    return null;
  },
  checkExcelFile : value =>{
    const regex = /^.+\.(xlsx|xls|csv)$/;
    if (value && !regex.test(String(value).toLowerCase())) {
      return FORM_ERROR_MESSAGES.INVALID_INPUT;
    }
    return null;
  },
  checkPassword: value => {
    if (value && value.length < 8) {
      return FORM_ERROR_MESSAGES.PASSWORD_CRITERIA;
    }
    return null;
  },
  checkDomain : value => {
    const regex = /^((?:(?:(?:\w[\.\-\+]?)*)\w)+)((?:(?:(?:\w[\.\-\+]?){0,62})\w)+)\.(\w{2,6})$/;
    if (value && !regex.test(String(value).toLowerCase())){
      return FORM_ERROR_MESSAGES.INVALID_DOMAIN
    }
  },
  handleImageFileValidation(key,value){
    if (key === FORM_CONSTANTS.IMAGE) {
      errorValidation[key] = this.isEmpty(value) || this.checkImageFile(value);
    }
    if (key === FORM_CONSTANTS.FILE) {
      errorValidation[key] = this.isEmpty(value) || this.checkExcelFile(value);
    }
    if (key === FORM_CONSTANTS.AUDIENCE) {
      errorValidation[key] = this.isEmpty(value); 
    }
    return errorValidation
  },
  handleBulkUploadContactValidation(values) {
    const errors = {};
    errors[FORM_CONSTANTS.FILE] = this.isEmpty(values[FORM_CONSTANTS.FILE] && values[FORM_CONSTANTS.FILE].name) || this.checkExcelFile(values[FORM_CONSTANTS.FILE] && values[FORM_CONSTANTS.FILE].name);
    errors[FORM_CONSTANTS.AUDIENCE] = this.isEmpty(values[FORM_CONSTANTS.AUDIENCE]);
    return errors; 
  },
  handlePasswordValidation(key,value){
    if (key === AUTH_FORM_CONSTANTS.PASSWORD) {
      errorValidation[key] =this.isRequired(value) || this.checkPassword(value);
    }
    return errorValidation
  },
  handleFormValidation(key, value, context) {
    if (key === AUTH_FORM_CONSTANTS.EMAIL) {
      errorValidation[key] = this.isRequired(value) || this.checkEmail(value);
    }
    if (key === AUTH_FORM_CONSTANTS.PASSWORD) {
      errorValidation[key] =
      context === "login" ? this.isRequired(value) :
        this.isRequired(value) || this.checkPassword(value);
    }
    if (key === AUTH_FORM_CONSTANTS.NAME) {
      errorValidation[key] =
        this.isRequired(value) || this.checkFullName(value);
    }
    return errorValidation;
  },
  handleRegisterFormValidation(values) {
    const errors = {};
    errors[AUTH_FORM_CONSTANTS.NAME] =  this.isRequired(values[AUTH_FORM_CONSTANTS.NAME]) || this.checkFullName(values[AUTH_FORM_CONSTANTS.NAME]);
    errors[AUTH_FORM_CONSTANTS.EMAIL] = this.isRequired(values[AUTH_FORM_CONSTANTS.EMAIL]) || this.checkEmail(values[AUTH_FORM_CONSTANTS.EMAIL]);
    errors[AUTH_FORM_CONSTANTS.PASSWORD] = this.isRequired(values[AUTH_FORM_CONSTANTS.PASSWORD]) || this.checkPassword(values[AUTH_FORM_CONSTANTS.PASSWORD]);
    return errors;
  },
  handleLoginFormValidation(values) {
    const errors = {};
    errors[AUTH_FORM_CONSTANTS.EMAIL] = this.isRequired(values[AUTH_FORM_CONSTANTS.EMAIL]) || this.checkEmail(values[AUTH_FORM_CONSTANTS.EMAIL]);
    errors[AUTH_FORM_CONSTANTS.PASSWORD] = this.isRequired(values[AUTH_FORM_CONSTANTS.PASSWORD]);
    return errors;
  },
  handleContactFormValidation(values){
    const errors = {};
    errors[CONTACT_FORM_CONSTANTS.EMAIL] = this.isRequired(values[CONTACT_FORM_CONSTANTS.EMAIL]) || this.checkEmail(values[CONTACT_FORM_CONSTANTS.EMAIL]);
    errors[CONTACT_FORM_CONSTANTS.FIRSTNAME] = this.isRequired(values[CONTACT_FORM_CONSTANTS.FIRSTNAME]) || this.checkFirstName(values[CONTACT_FORM_CONSTANTS.FIRSTNAME]);
    // if (key === CONTACT_FORM_CONSTANTS.EMAIL) {
    //   errorValidation[key] = this.isRequired(value) || this.checkEmail(value);
    // }
    // if (key === CONTACT_FORM_CONSTANTS.FIRSTNAME) {
    //   errorValidation[key] =
    //     this.isRequired(value) || this.checkFirstName(value);
    // }
    // if (key === CONTACT_FORM_CONSTANTS.PHONE) {
    //   errorValidation[key] =
    //     this.isRequired(value) || this.checkPhoneNumber(value)
    // }
    // if (key === CONTACT_FORM_CONSTANTS.AUDIENCE) {
    //   errorValidation[key] = this.isEmpty(value); 
    // }
    return  errors
  },
  handleAudienceFormValidation(values){
    const errors = {};
    errors[AUDIENCE_FORM_CONSTANTS.NAME] = this.isRequired(values[AUDIENCE_FORM_CONSTANTS.NAME]) || this.checkFullName(values[AUDIENCE_FORM_CONSTANTS.NAME]);
    
    return errors;
  },
  handlePasswordValidation(key,value){
    if (key === AUTH_FORM_CONSTANTS.PASSWORD){
      errorValidation[key] =this.isRequired(value) || this.checkPassword(value);
    }
    return errorValidation
  },
  handleWorkflowStartValidation(key,value){
    if(key === WORKFLOW_CONSTANTS.WORKFLOW_NAME){
      errorValidation[key] = this.isRequired(value) || this.checkFullName(value);
    }
    if(key === WORKFLOW_CONSTANTS.WORKFLOW_TRIGGER){
      errorValidation[key] = this.isRequired(value)
    }
    if(key === WORKFLOW_CONSTANTS.WORKFLOW_ACTION){
      errorValidation[key] = this.isRequired(value)
    }
    return errorValidation
  },
  handleWorkflowDelayValidation(key,value){
    if(key === WORKFLOW_CONSTANTS.DELAY_INPUT){
      errorValidation[key] = this.isRequired(value) || this.checkNumber(value)
    }
    return errorValidation
  },
  handleWorkflowAudienceValidation(key,value){
    if(key === WORKFLOW_CONSTANTS.AUDIENCE){
      errorValidation[key] = this.isRequired(value);
    }
    return errorValidation
  },
  handleWorkflowEmailValidation(key,value){
    if(key === WORKFLOW_CONSTANTS.EMAIL_CAMPAIGN){
      errorValidation[key] = this.isRequired(value);
    }
    return errorValidation
  },
  handleCampaignSettingFormValidation(values) {
    const errors = {};
    errors[EMAIL_CAMPAIGN_FORM_CONSTANTS.REPLY_TO] = this.isRequired(values[EMAIL_CAMPAIGN_FORM_CONSTANTS.REPLY_TO]) || this.checkEmail(values[EMAIL_CAMPAIGN_FORM_CONSTANTS.REPLY_TO]);
    errors[EMAIL_CAMPAIGN_FORM_CONSTANTS.SUBJECT] = this.isRequired(values[EMAIL_CAMPAIGN_FORM_CONSTANTS.SUBJECT]);
    errors[EMAIL_CAMPAIGN_FORM_CONSTANTS.NAME] = this.isRequired(values[EMAIL_CAMPAIGN_FORM_CONSTANTS.NAME]);
    errors[EMAIL_CAMPAIGN_FORM_CONSTANTS.FROM_NAME] = this.isRequired(values[EMAIL_CAMPAIGN_FORM_CONSTANTS.FROM_NAME]);
    errors[EMAIL_CAMPAIGN_FORM_CONSTANTS.FROM_EMAIL] = this.isRequired(values[EMAIL_CAMPAIGN_FORM_CONSTANTS.FROM_EMAIL]);
    errors[EMAIL_CAMPAIGN_FORM_CONSTANTS.AUDIENCE] = this.isEmpty(values[EMAIL_CAMPAIGN_FORM_CONSTANTS.AUDIENCE]);
    return errors;
  },
  handleAmazonSesModalFormValidation(values) {
    const errors = {};
    errors[SES_MODAL_FORM_CONSTANTS.NAME] = this.isRequired(values[SES_MODAL_FORM_CONSTANTS.NAME]) 
    errors[SES_MODAL_FORM_CONSTANTS.REGION] = this.isRequired(values[SES_MODAL_FORM_CONSTANTS.REGION]);
    errors[SES_MODAL_FORM_CONSTANTS.ACCESS_ID] = this.isRequired(values[SES_MODAL_FORM_CONSTANTS.ACCESS_ID]);
    errors[SES_MODAL_FORM_CONSTANTS.ACCESS_KEY] = this.isRequired(values[SES_MODAL_FORM_CONSTANTS.ACCESS_KEY]);
    return errors;
  },
  handleSmtpModalFormValidation(values) {
    const errors = {};
    errors[SMTP_MODAL_FORM_CONSTANTS.NAME] = this.isRequired(values[SMTP_MODAL_FORM_CONSTANTS.NAME]) 
    errors[SMTP_MODAL_FORM_CONSTANTS.HOST_NAME] = this.isRequired(values[SMTP_MODAL_FORM_CONSTANTS.HOST_NAME]);
    errors[SMTP_MODAL_FORM_CONSTANTS.USERNAME] = this.isRequired(values[SMTP_MODAL_FORM_CONSTANTS.USERNAME]);
    errors[SMTP_MODAL_FORM_CONSTANTS.PASSWORD] = this.checkPassword(values[SMTP_MODAL_FORM_CONSTANTS.PASSWORD]) || this.isRequired(values[SMTP_MODAL_FORM_CONSTANTS.PASSWORD]);
    // errors[SMTP_MODAL_FORM_CONSTANTS.ACCESS_KEY] = this.isRequired(values[SMTP_MODAL_FORM_CONSTANTS.ACCESS_KEY]);
    errors[SMTP_MODAL_FORM_CONSTANTS.PORT] = this.checkNumber(values[SMTP_MODAL_FORM_CONSTANTS.PORT]) || this.isRequired(values[SMTP_MODAL_FORM_CONSTANTS.PORT]);
    errors[SMTP_MODAL_FORM_CONSTANTS.ENCRYPTION_METHOD] = this.isRequired(values[SMTP_MODAL_FORM_CONSTANTS.ENCRYPTION_METHOD]);
    return errors;
  },
  handleAddServerModalFormValidation(values) {
    const errors = {};
    errors[ADD_SENDER_MODAL_FORM_CONSTANTS.NAME] = this.isRequired(values[ADD_SENDER_MODAL_FORM_CONSTANTS.NAME]) 
    errors[ADD_SENDER_MODAL_FORM_CONSTANTS.EMAIL] = this.isRequired(values[ADD_SENDER_MODAL_FORM_CONSTANTS.EMAIL]) || this.checkEmail(values[ADD_SENDER_MODAL_FORM_CONSTANTS.EMAIL]);
    return errors;
  },
  handleAddInstallSiteFormValidation(values) {
    const errors = {};
    errors[SITE_CODE_VERIFICATION_CONST.INSTALL_SITE] = this.isRequired(values[SITE_CODE_VERIFICATION_CONST.INSTALL_SITE]) ;
    return errors;
  },
  handleCreateNewFormValidation(values) {
    const errors = {};
    errors[CREATE_NEW_FORM_CONSTANTS.NAME] = this.isRequired(values[CREATE_NEW_FORM_CONSTANTS.NAME]) 
    errors[CREATE_NEW_FORM_CONSTANTS.TYPE] = this.isRequired(values[CREATE_NEW_FORM_CONSTANTS.TYPE])
    return errors;
  },
  handleAccountSettingFormValidation(values) {
    const errors = {};
    errors[ACCOUNT_FORM_CONSTANTS.FIRSTNAME] = this.isRequired(values[ACCOUNT_FORM_CONSTANTS.FIRSTNAME]);
    errors[ACCOUNT_FORM_CONSTANTS.LASTNAME] = this.isRequired(values[ACCOUNT_FORM_CONSTANTS.LASTNAME]); 
    // errors[ACCOUNT_FORM_CONSTANTS.PHONE] = this.isRequired(values[ACCOUNT_FORM_CONSTANTS.PHONE]) || this.checkNumber(values[ACCOUNT_FORM_CONSTANTS.PHONE]);
    errors[ACCOUNT_FORM_CONSTANTS.COUNTRY_CODE] = this.isRequired(values[ACCOUNT_FORM_CONSTANTS.COUNTRY_CODE]); 
    return errors;
  },
  handleBrandSettingFormValidation(values){

    const errors = {};
    errors[BRAND_CONSTANTS.BRAND_NAME] = this.isRequired(values[BRAND_CONSTANTS.BRAND_NAME]);
    errors[BRAND_CONSTANTS.BRAND_SLUG] = this.isRequired(values[BRAND_CONSTANTS.BRAND_SLUG])
    return errors;
  },
  handleSocialPostValidation(values){
    const errors = {}
    errors[SOCIALPOST_CONSTANTS.TEXT] = this.isRequired(values[SOCIALPOST_CONSTANTS.TEXT]);
    errors[SOCIALPOST_CONSTANTS.TEXT_VALUE] = this.isRequired(values[SOCIALPOST_CONSTANTS.TEXT_VALUE])
    return errors
  },
  handleCheckDomain(values){
    const errors = {}
    errors[DOMAIN_CONSTANT.DOMAIN] = this.isRequired(values[DOMAIN_CONSTANT.DOMAIN]) || this.checkDomain(values[DOMAIN_CONSTANT.DOMAIN]);
    return errors
  }
};

export default ValidationHelpers;
