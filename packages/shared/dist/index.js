"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var index_exports = {};
__export(index_exports, {
  BILLING_STATUS: () => BILLING_STATUS,
  BILLING_STATUSES: () => BILLING_STATUSES,
  BillingSchema: () => BillingSchema,
  CreateProfileDtoSchema: () => CreateProfileDtoSchema,
  CreateProjectDtoSchema: () => CreateProjectDtoSchema,
  CreatePromptDtoSchema: () => CreatePromptDtoSchema,
  CreateSegmentDtoSchema: () => CreateSegmentDtoSchema,
  CreateValidatorDtoSchema: () => CreateValidatorDtoSchema,
  DEFAULT_LANGUAGE: () => DEFAULT_LANGUAGE,
  DEFAULT_LOCALE: () => DEFAULT_LOCALE,
  ENTITY_TYPE: () => ENTITY_TYPE,
  ERROR_CODE: () => ERROR_CODE,
  KIND: () => KIND,
  KINDS: () => KINDS,
  LANGUAGE: () => LANGUAGE,
  LANGUAGES: () => LANGUAGES,
  LOCALES: () => LOCALES,
  PLAN: () => PLAN,
  PLANS: () => PLANS,
  ProfileSchema: () => ProfileSchema,
  ProjectSchema: () => ProjectSchema,
  PromptSchema: () => PromptSchema,
  ROLE: () => ROLE,
  ROLES: () => ROLES,
  SegmentSchema: () => SegmentSchema,
  THEME_PREF: () => THEME_PREF,
  THEME_PREFS: () => THEME_PREFS,
  UpdateProfileDtoSchema: () => UpdateProfileDtoSchema,
  UpdateProjectDtoSchema: () => UpdateProjectDtoSchema,
  UpdatePromptDtoSchema: () => UpdatePromptDtoSchema,
  UpdateSegmentDtoSchema: () => UpdateSegmentDtoSchema,
  UpdateValidatorDtoSchema: () => UpdateValidatorDtoSchema,
  VISIBILITIES: () => VISIBILITIES,
  VISIBILITY: () => VISIBILITY,
  ValidatorSchema: () => ValidatorSchema,
  VersionSchema: () => VersionSchema,
  andThen: () => andThen,
  cacheDel: () => cacheDel,
  cacheGet: () => cacheGet,
  cacheSet: () => cacheSet,
  checkIntegrations: () => checkIntegrations,
  clientEnvSchema: () => clientEnvSchema,
  combine: () => combine,
  conflictError: () => conflictError,
  createCheckoutSession: () => createCheckoutSession,
  createClientAnon: () => createClientAnon,
  createClientService: () => createClientService,
  createCustomer: () => createCustomer,
  createPortalSession: () => createPortalSession,
  en: () => en,
  err: () => err,
  forbiddenError: () => forbiddenError,
  formatErrorForLogging: () => formatErrorForLogging,
  fromPromise: () => fromPromise,
  fromThrowable: () => fromThrowable,
  getBestLocale: () => getBestLocale,
  getCustomerByEmail: () => getCustomerByEmail,
  getDict: () => getDict,
  getEnv: () => getEnv,
  getHttpStatusCode: () => getHttpStatusCode,
  getInitialTheme: () => getInitialTheme,
  getRedisClient: () => getRedisClient,
  getResolvedTheme: () => getResolvedTheme,
  getStripeClient: () => getStripeClient,
  getTranslation: () => getTranslation,
  internalError: () => internalError,
  isAppError: () => isAppError,
  isErr: () => isErr,
  isOk: () => isOk,
  isValidLocale: () => isValidLocale,
  map: () => map,
  mapErr: () => mapErr,
  mapProfileToInsert: () => mapProfileToInsert,
  mapProfileToUpdate: () => mapProfileToUpdate,
  mapProjectToInsert: () => mapProjectToInsert,
  mapProjectToUpdate: () => mapProjectToUpdate,
  mapPromptToInsert: () => mapPromptToInsert,
  mapPromptToUpdate: () => mapPromptToUpdate,
  mapSegmentToInsert: () => mapSegmentToInsert,
  mapSegmentToUpdate: () => mapSegmentToUpdate,
  mapToBilling: () => mapToBilling,
  mapToProfile: () => mapToProfile,
  mapToProfiles: () => mapToProfiles,
  mapToProject: () => mapToProject,
  mapToProjects: () => mapToProjects,
  mapToPrompt: () => mapToPrompt,
  mapToPrompts: () => mapToPrompts,
  mapToSegment: () => mapToSegment,
  mapToSegments: () => mapToSegments,
  mapToValidator: () => mapToValidator,
  mapToValidators: () => mapToValidators,
  mapToVersion: () => mapToVersion,
  mapToVersions: () => mapToVersions,
  mapValidatorToInsert: () => mapValidatorToInsert,
  mapValidatorToUpdate: () => mapValidatorToUpdate,
  notFoundError: () => notFoundError,
  ok: () => ok,
  ptBR: () => ptBR,
  rateLimit: () => rateLimit,
  rateLimitError: () => rateLimitError,
  setThemePreference: () => setThemePreference,
  t: () => t,
  toAppError: () => toAppError,
  unauthorizedError: () => unauthorizedError,
  unwrap: () => unwrap,
  unwrapOr: () => unwrapOr,
  validateClientEnv: () => validateClientEnv,
  validateEnv: () => validateEnv,
  validateWebhookSignature: () => validateWebhookSignature,
  validationError: () => validationError
});
module.exports = __toCommonJS(index_exports);

// src/enums/role.ts
var ROLE = {
  user: "user",
  pro: "pro",
  admin: "admin"
};
var ROLES = Object.values(ROLE);

// src/enums/visibility.ts
var VISIBILITY = {
  private: "private",
  public: "public"
};
var VISIBILITIES = Object.values(VISIBILITY);

// src/enums/kind.ts
var KIND = {
  prompt: "prompt",
  system: "system",
  tool: "tool"
};
var KINDS = Object.values(KIND);

// src/enums/plan.ts
var PLAN = {
  free: "free",
  pro: "pro"
};
var PLANS = Object.values(PLAN);

// src/enums/billingStatus.ts
var BILLING_STATUS = {
  active: "active",
  past_due: "past_due",
  canceled: "canceled",
  incomplete: "incomplete"
};
var BILLING_STATUSES = Object.values(BILLING_STATUS);

// src/enums/themePref.ts
var THEME_PREF = {
  light: "light",
  dark: "dark"
};
var THEME_PREFS = Object.values(THEME_PREF);

// src/enums/language.ts
var LANGUAGE = {
  en: "en",
  "pt-BR": "pt-BR"
};
var LANGUAGES = Object.values(LANGUAGE);
var DEFAULT_LANGUAGE = "pt-BR";

// src/schemas/profile.ts
var import_zod = require("zod");
var ProfileSchema = import_zod.z.object({
  id: import_zod.z.string().uuid(),
  handle: import_zod.z.string().min(1).max(50),
  name: import_zod.z.string().min(1).max(100).optional(),
  role: import_zod.z.enum([ROLE.user, ROLE.pro, ROLE.admin]).default(ROLE.user),
  stripe_customer_id: import_zod.z.string().optional(),
  theme_pref: import_zod.z.enum([THEME_PREF.light, THEME_PREF.dark]).default(THEME_PREF.light),
  created_at: import_zod.z.coerce.date(),
  updated_at: import_zod.z.coerce.date()
}).strict();

// src/schemas/project.ts
var import_zod2 = require("zod");
var ProjectSchema = import_zod2.z.object({
  id: import_zod2.z.string().uuid(),
  owner_id: import_zod2.z.string().uuid(),
  name: import_zod2.z.string().min(1).max(100),
  description: import_zod2.z.string().max(1e3).optional(),
  visibility: import_zod2.z.enum([VISIBILITY.private, VISIBILITY.public]).default(VISIBILITY.private),
  created_at: import_zod2.z.coerce.date(),
  updated_at: import_zod2.z.coerce.date()
}).strict();

// src/schemas/segment.ts
var import_zod3 = require("zod");
var SegmentSchema = import_zod3.z.object({
  id: import_zod3.z.string().uuid(),
  project_id: import_zod3.z.string().uuid(),
  name: import_zod3.z.string().min(1).max(100),
  position: import_zod3.z.number().int().min(0).default(0),
  created_at: import_zod3.z.coerce.date(),
  updated_at: import_zod3.z.coerce.date()
}).strict();

// src/schemas/prompt.ts
var import_zod4 = require("zod");
var PromptSchema = import_zod4.z.object({
  id: import_zod4.z.string().uuid(),
  segment_id: import_zod4.z.string().uuid(),
  title: import_zod4.z.string().min(1).max(200),
  body: import_zod4.z.string().min(1),
  language: import_zod4.z.enum([LANGUAGE.en, LANGUAGE["pt-BR"]]).default(DEFAULT_LANGUAGE),
  kind: import_zod4.z.enum([KIND.prompt, KIND.system, KIND.tool]).default(KIND.prompt),
  position: import_zod4.z.number().int().min(0).default(0),
  created_at: import_zod4.z.coerce.date(),
  updated_at: import_zod4.z.coerce.date()
}).strict();

// src/schemas/validator.ts
var import_zod5 = require("zod");
var ValidatorSchema = import_zod5.z.object({
  id: import_zod5.z.string().uuid(),
  prompt_id: import_zod5.z.string().uuid(),
  title: import_zod5.z.string().min(1).max(200),
  body: import_zod5.z.string().min(1),
  created_at: import_zod5.z.coerce.date(),
  updated_at: import_zod5.z.coerce.date()
}).strict();

// src/schemas/version.ts
var import_zod6 = require("zod");
var ENTITY_TYPE = {
  project: "project",
  segment: "segment",
  prompt: "prompt",
  validator: "validator"
};
var VersionSchema = import_zod6.z.object({
  id: import_zod6.z.string().uuid(),
  entity_type: import_zod6.z.enum([ENTITY_TYPE.project, ENTITY_TYPE.segment, ENTITY_TYPE.prompt, ENTITY_TYPE.validator]),
  entity_id: import_zod6.z.string().uuid(),
  snapshot: import_zod6.z.any(),
  // Keep broad - consuming code will validate by entity type
  author_id: import_zod6.z.string().uuid().nullable(),
  created_at: import_zod6.z.coerce.date()
}).strict();

// src/schemas/billing.ts
var import_zod7 = require("zod");
var BillingSchema = import_zod7.z.object({
  profile_id: import_zod7.z.string().uuid(),
  plan: import_zod7.z.enum([PLAN.free, PLAN.pro]).default(PLAN.free),
  current_period_end: import_zod7.z.coerce.date().nullable(),
  status: import_zod7.z.enum([BILLING_STATUS.active, BILLING_STATUS.past_due, BILLING_STATUS.canceled, BILLING_STATUS.incomplete]).optional(),
  updated_at: import_zod7.z.coerce.date()
}).strict();

// src/dtos/profile.dto.ts
var CreateProfileDtoSchema = ProfileSchema.pick({
  handle: true,
  name: true,
  role: true,
  theme_pref: true
}).strict();
var UpdateProfileDtoSchema = ProfileSchema.pick({
  handle: true,
  name: true,
  theme_pref: true
}).partial().strict();

// src/dtos/project.dto.ts
var CreateProjectDtoSchema = ProjectSchema.pick({
  name: true,
  description: true,
  visibility: true
}).strict();
var UpdateProjectDtoSchema = ProjectSchema.pick({
  name: true,
  description: true,
  visibility: true
}).partial().strict();

// src/dtos/segment.dto.ts
var CreateSegmentDtoSchema = SegmentSchema.pick({
  project_id: true,
  name: true,
  position: true
}).strict();
var UpdateSegmentDtoSchema = SegmentSchema.pick({
  name: true,
  position: true
}).partial().strict();

// src/dtos/prompt.dto.ts
var CreatePromptDtoSchema = PromptSchema.pick({
  segment_id: true,
  title: true,
  body: true,
  language: true,
  kind: true,
  position: true
}).strict();
var UpdatePromptDtoSchema = PromptSchema.pick({
  title: true,
  body: true,
  language: true,
  kind: true,
  position: true
}).partial().strict();

// src/dtos/validator.dto.ts
var CreateValidatorDtoSchema = ValidatorSchema.pick({
  prompt_id: true,
  title: true,
  body: true
}).strict();
var UpdateValidatorDtoSchema = ValidatorSchema.pick({
  title: true,
  body: true
}).partial().strict();

// src/result.ts
function ok(value) {
  return { ok: true, value };
}
function err(error) {
  return { ok: false, error };
}
function isOk(result) {
  return result.ok;
}
function isErr(result) {
  return !result.ok;
}
function unwrap(result) {
  if (result.ok) {
    return result.value;
  }
  if (result.error instanceof Error) {
    throw result.error;
  }
  throw new Error(`Unwrap failed: ${String(result.error)}`);
}
function unwrapOr(result, defaultValue) {
  return result.ok ? result.value : defaultValue;
}
function map(result, fn) {
  return result.ok ? ok(fn(result.value)) : result;
}
function mapErr(result, fn) {
  return result.ok ? result : err(fn(result.error));
}
function andThen(result, fn) {
  return result.ok ? fn(result.value) : result;
}
function combine(results) {
  const values = [];
  for (const result of results) {
    if (!result.ok) {
      return result;
    }
    values.push(result.value);
  }
  return ok(values);
}
async function fromPromise(promise) {
  try {
    const value = await promise;
    return ok(value);
  } catch (error) {
    return err(error instanceof Error ? error : new Error(String(error)));
  }
}
function fromThrowable(fn) {
  return (...args) => {
    try {
      const value = fn(...args);
      return ok(value);
    } catch (error) {
      return err(error instanceof Error ? error : new Error(String(error)));
    }
  };
}

// src/mappers/toDomain.ts
function mapToProfile(raw) {
  try {
    const profile = ProfileSchema.parse(raw);
    return ok(profile);
  } catch (error) {
    return err(new Error(`Invalid profile data: ${error}`));
  }
}
function mapToProject(raw) {
  try {
    const project = ProjectSchema.parse(raw);
    return ok(project);
  } catch (error) {
    return err(new Error(`Invalid project data: ${error}`));
  }
}
function mapToSegment(raw) {
  try {
    const segment = SegmentSchema.parse(raw);
    return ok(segment);
  } catch (error) {
    return err(new Error(`Invalid segment data: ${error}`));
  }
}
function mapToPrompt(raw) {
  try {
    const prompt = PromptSchema.parse(raw);
    return ok(prompt);
  } catch (error) {
    return err(new Error(`Invalid prompt data: ${error}`));
  }
}
function mapToValidator(raw) {
  try {
    const validator = ValidatorSchema.parse(raw);
    return ok(validator);
  } catch (error) {
    return err(new Error(`Invalid validator data: ${error}`));
  }
}
function mapToVersion(raw) {
  try {
    const version = VersionSchema.parse(raw);
    return ok(version);
  } catch (error) {
    return err(new Error(`Invalid version data: ${error}`));
  }
}
function mapToBilling(raw) {
  try {
    const billing = BillingSchema.parse(raw);
    return ok(billing);
  } catch (error) {
    return err(new Error(`Invalid billing data: ${error}`));
  }
}
function mapToProfiles(rawArray) {
  const profiles = [];
  for (const raw of rawArray) {
    const result = mapToProfile(raw);
    if (!result.ok) {
      return result;
    }
    profiles.push(result.value);
  }
  return ok(profiles);
}
function mapToProjects(rawArray) {
  const projects = [];
  for (const raw of rawArray) {
    const result = mapToProject(raw);
    if (!result.ok) {
      return result;
    }
    projects.push(result.value);
  }
  return ok(projects);
}
function mapToSegments(rawArray) {
  const segments = [];
  for (const raw of rawArray) {
    const result = mapToSegment(raw);
    if (!result.ok) {
      return result;
    }
    segments.push(result.value);
  }
  return ok(segments);
}
function mapToPrompts(rawArray) {
  const prompts = [];
  for (const raw of rawArray) {
    const result = mapToPrompt(raw);
    if (!result.ok) {
      return result;
    }
    prompts.push(result.value);
  }
  return ok(prompts);
}
function mapToValidators(rawArray) {
  const validators = [];
  for (const raw of rawArray) {
    const result = mapToValidator(raw);
    if (!result.ok) {
      return result;
    }
    validators.push(result.value);
  }
  return ok(validators);
}
function mapToVersions(rawArray) {
  const versions = [];
  for (const raw of rawArray) {
    const result = mapToVersion(raw);
    if (!result.ok) {
      return result;
    }
    versions.push(result.value);
  }
  return ok(versions);
}

// src/mappers/toPersist.ts
function mapProfileToInsert(dto, id, now = /* @__PURE__ */ new Date()) {
  return {
    ...dto,
    id,
    created_at: now,
    updated_at: now
  };
}
function mapProfileToUpdate(dto, now = /* @__PURE__ */ new Date()) {
  return {
    ...dto,
    updated_at: now
  };
}
function mapProjectToInsert(dto, id, owner_id, now = /* @__PURE__ */ new Date()) {
  return {
    ...dto,
    id,
    owner_id,
    created_at: now,
    updated_at: now
  };
}
function mapProjectToUpdate(dto, now = /* @__PURE__ */ new Date()) {
  return {
    ...dto,
    updated_at: now
  };
}
function mapSegmentToInsert(dto, id, now = /* @__PURE__ */ new Date()) {
  return {
    ...dto,
    id,
    created_at: now,
    updated_at: now
  };
}
function mapSegmentToUpdate(dto, now = /* @__PURE__ */ new Date()) {
  return {
    ...dto,
    updated_at: now
  };
}
function mapPromptToInsert(dto, id, now = /* @__PURE__ */ new Date()) {
  return {
    ...dto,
    id,
    created_at: now,
    updated_at: now
  };
}
function mapPromptToUpdate(dto, now = /* @__PURE__ */ new Date()) {
  return {
    ...dto,
    updated_at: now
  };
}
function mapValidatorToInsert(dto, id, now = /* @__PURE__ */ new Date()) {
  return {
    ...dto,
    id,
    created_at: now,
    updated_at: now
  };
}
function mapValidatorToUpdate(dto, now = /* @__PURE__ */ new Date()) {
  return {
    ...dto,
    updated_at: now
  };
}

// src/errors.ts
var ERROR_CODE = {
  VALIDATION_ERROR: "VALIDATION_ERROR",
  NOT_FOUND: "NOT_FOUND",
  UNAUTHORIZED: "UNAUTHORIZED",
  FORBIDDEN: "FORBIDDEN",
  CONFLICT: "CONFLICT",
  RATE_LIMIT: "RATE_LIMIT",
  INTERNAL: "INTERNAL"
};
function validationError(message, details) {
  return {
    code: ERROR_CODE.VALIDATION_ERROR,
    message,
    i18nKey: "errors.validation",
    ...details !== void 0 && { details }
  };
}
function notFoundError(resource, id) {
  return {
    code: ERROR_CODE.NOT_FOUND,
    message: `${resource}${id ? ` with id ${id}` : ""} not found`,
    details: { resource, id },
    i18nKey: "errors.not_found"
  };
}
function unauthorizedError(message = "Authentication required") {
  return {
    code: ERROR_CODE.UNAUTHORIZED,
    message,
    i18nKey: "errors.unauthorized"
  };
}
function forbiddenError(message = "Insufficient permissions") {
  return {
    code: ERROR_CODE.FORBIDDEN,
    message,
    i18nKey: "errors.forbidden"
  };
}
function conflictError(message, details) {
  return {
    code: ERROR_CODE.CONFLICT,
    message,
    i18nKey: "errors.conflict",
    ...details !== void 0 && { details }
  };
}
function rateLimitError(message = "Too many requests") {
  return {
    code: ERROR_CODE.RATE_LIMIT,
    message,
    i18nKey: "errors.rate_limit"
  };
}
function internalError(message = "Internal server error", details) {
  return {
    code: ERROR_CODE.INTERNAL,
    message,
    i18nKey: "errors.internal",
    ...details !== void 0 && { details }
  };
}
function toAppError(error) {
  if (isAppError(error)) {
    return error;
  }
  if (error instanceof Error) {
    return internalError(error.message);
  }
  return internalError(String(error));
}
function isAppError(error) {
  return typeof error === "object" && error !== null && "code" in error && "message" in error && typeof error.code === "string" && typeof error.message === "string";
}
function getHttpStatusCode(errorCode) {
  switch (errorCode) {
    case ERROR_CODE.VALIDATION_ERROR:
      return 400;
    case ERROR_CODE.UNAUTHORIZED:
      return 401;
    case ERROR_CODE.FORBIDDEN:
      return 403;
    case ERROR_CODE.NOT_FOUND:
      return 404;
    case ERROR_CODE.CONFLICT:
      return 409;
    case ERROR_CODE.RATE_LIMIT:
      return 429;
    case ERROR_CODE.INTERNAL:
    default:
      return 500;
  }
}
function formatErrorForLogging(error) {
  return {
    code: error.code,
    message: error.message,
    i18nKey: error.i18nKey,
    // Only include non-sensitive details
    details: error.details ? Object.keys(error.details) : void 0
  };
}

// src/i18n/en.ts
var en = {
  common: {
    ok: "OK",
    cancel: "Cancel",
    save: "Save",
    delete: "Delete",
    edit: "Edit",
    create: "Create",
    update: "Update",
    loading: "Loading...",
    search: "Search",
    filter: "Filter",
    sort: "Sort",
    actions: "Actions"
  },
  project: {
    title: "Projects",
    create: "Create Project",
    edit: "Edit Project",
    delete: "Delete Project",
    name: "Project Name",
    description: "Description",
    visibility: "Visibility",
    visibility_public: "Public",
    visibility_private: "Private",
    owner: "Owner",
    created_at: "Created",
    updated_at: "Updated"
  },
  segment: {
    title: "Collections",
    create: "Create Collection",
    edit: "Edit Collection",
    delete: "Delete Collection",
    name: "Collection Name",
    position: "Position",
    prompts_count: "Prompts"
  },
  prompt: {
    title: "Prompts",
    create: "Create Prompt",
    edit: "Edit Prompt",
    delete: "Delete Prompt",
    title_field: "Prompt Title",
    body: "Content",
    language: "Language",
    kind: "Type",
    kind_prompt: "Prompt",
    kind_system: "System",
    kind_tool: "Tool",
    position: "Position"
  },
  validator: {
    title: "Validators",
    create: "Create Validator",
    edit: "Edit Validator",
    delete: "Delete Validator",
    title_field: "Validator Title",
    body: "Validation Rules"
  },
  profile: {
    title: "Profile",
    edit: "Edit Profile",
    handle: "Username",
    name: "Display Name",
    role: "Role",
    role_user: "User",
    role_pro: "Pro",
    role_admin: "Admin",
    theme_pref: "Theme",
    theme_light: "Light",
    theme_dark: "Dark"
  },
  billing: {
    title: "Billing",
    plan: "Plan",
    plan_free: "Free",
    plan_pro: "Pro",
    status: "Status",
    status_active: "Active",
    status_past_due: "Past Due",
    status_canceled: "Canceled",
    status_incomplete: "Incomplete",
    current_period_end: "Current Period Ends"
  },
  errors: {
    validation: "Invalid data provided",
    not_found: "Resource not found",
    unauthorized: "You need to sign in",
    forbidden: "You do not have permission to perform this action",
    conflict: "A conflict was detected",
    rate_limit: "Too many requests, please try again later",
    internal: "An unexpected error occurred"
  }
};

// src/i18n/pt-BR.ts
var ptBR = {
  common: {
    ok: "OK",
    cancel: "Cancelar",
    save: "Salvar",
    delete: "Excluir",
    edit: "Editar",
    create: "Criar",
    update: "Atualizar",
    loading: "Carregando...",
    search: "Buscar",
    filter: "Filtrar",
    sort: "Ordenar",
    actions: "A\xE7\xF5es"
  },
  project: {
    title: "Projetos",
    create: "Criar Projeto",
    edit: "Editar Projeto",
    delete: "Excluir Projeto",
    name: "Nome do Projeto",
    description: "Descri\xE7\xE3o",
    visibility: "Visibilidade",
    visibility_public: "P\xFAblico",
    visibility_private: "Privado",
    owner: "Propriet\xE1rio",
    created_at: "Criado em",
    updated_at: "Atualizado em"
  },
  segment: {
    title: "Cole\xE7\xF5es",
    create: "Criar Cole\xE7\xE3o",
    edit: "Editar Cole\xE7\xE3o",
    delete: "Excluir Cole\xE7\xE3o",
    name: "Nome da Cole\xE7\xE3o",
    position: "Posi\xE7\xE3o",
    prompts_count: "Prompts"
  },
  prompt: {
    title: "Prompts",
    create: "Criar Prompt",
    edit: "Editar Prompt",
    delete: "Excluir Prompt",
    title_field: "T\xEDtulo do Prompt",
    body: "Conte\xFAdo",
    language: "Idioma",
    kind: "Tipo",
    kind_prompt: "Prompt",
    kind_system: "Sistema",
    kind_tool: "Ferramenta",
    position: "Posi\xE7\xE3o"
  },
  validator: {
    title: "Validadores",
    create: "Criar Validador",
    edit: "Editar Validador",
    delete: "Excluir Validador",
    title_field: "T\xEDtulo do Validador",
    body: "Regras de Valida\xE7\xE3o"
  },
  profile: {
    title: "Perfil",
    edit: "Editar Perfil",
    handle: "Nome de usu\xE1rio",
    name: "Nome de exibi\xE7\xE3o",
    role: "Fun\xE7\xE3o",
    role_user: "Usu\xE1rio",
    role_pro: "Pro",
    role_admin: "Admin",
    theme_pref: "Tema",
    theme_light: "Claro",
    theme_dark: "Escuro"
  },
  billing: {
    title: "Cobran\xE7a",
    plan: "Plano",
    plan_free: "Gratuito",
    plan_pro: "Pro",
    status: "Status",
    status_active: "Ativo",
    status_past_due: "Em atraso",
    status_canceled: "Cancelado",
    status_incomplete: "Incompleto",
    current_period_end: "Per\xEDodo atual termina em"
  },
  errors: {
    validation: "Dados inv\xE1lidos fornecidos",
    not_found: "Recurso n\xE3o encontrado",
    unauthorized: "Voc\xEA precisa fazer login",
    forbidden: "Voc\xEA n\xE3o tem permiss\xE3o para realizar esta a\xE7\xE3o",
    conflict: "Um conflito foi detectado",
    rate_limit: "Muitas solicita\xE7\xF5es, tente novamente mais tarde",
    internal: "Ocorreu um erro inesperado"
  }
};

// src/i18n/index.ts
var LOCALES = ["en", "pt-BR"];
var DEFAULT_LOCALE = "en";
var dictionaries = {
  en,
  "pt-BR": ptBR
};
function getDict(locale = DEFAULT_LOCALE) {
  return dictionaries[locale];
}
function getTranslation(locale, key) {
  const dict = getDict(locale);
  const keys = key.split(".");
  const [section, subKey] = keys;
  const sectionDict = dict[section];
  if (!sectionDict || typeof sectionDict !== "object") {
    return key;
  }
  const value = sectionDict[subKey];
  return value ?? key;
}
function t(key, locale = DEFAULT_LOCALE) {
  return getTranslation(locale, key);
}
function isValidLocale(locale) {
  return LOCALES.includes(locale);
}
function getBestLocale(preferredLocales) {
  for (const preferred of preferredLocales) {
    if (isValidLocale(preferred)) {
      return preferred;
    }
    const language = preferred.split("-")[0];
    if (language === "pt" && LOCALES.includes("pt-BR")) {
      return "pt-BR";
    }
    if (language === "en" && LOCALES.includes("en")) {
      return "en";
    }
  }
  return DEFAULT_LOCALE;
}

// src/env.ts
var import_zod8 = require("zod");
var envSchema = import_zod8.z.object({
  // Supabase
  NEXT_PUBLIC_SUPABASE_URL: import_zod8.z.string().url(),
  NEXT_PUBLIC_SUPABASE_ANON_KEY: import_zod8.z.string().min(1),
  SUPABASE_SERVICE_ROLE: import_zod8.z.string().min(1),
  // Upstash Redis
  UPSTASH_REDIS_REST_URL: import_zod8.z.string().url(),
  UPSTASH_REDIS_REST_TOKEN: import_zod8.z.string().min(1),
  // Stripe
  STRIPE_SECRET_KEY: import_zod8.z.string().min(1),
  STRIPE_WEBHOOK_SECRET: import_zod8.z.string().min(1),
  // Node Environment
  NODE_ENV: import_zod8.z.enum(["development", "test", "production"]).default("development")
});
function validateEnv(env = process.env) {
  const result = envSchema.safeParse(env);
  if (!result.success) {
    console.error("\u274C Invalid environment variables:");
    console.error(result.error.format());
    throw new Error("Invalid environment variables");
  }
  return result.data;
}
var _env = null;
function getEnv() {
  if (!_env) {
    _env = validateEnv();
  }
  return _env;
}
function checkIntegrations(env = process.env) {
  const supabase = !!(env.NEXT_PUBLIC_SUPABASE_URL && env.NEXT_PUBLIC_SUPABASE_ANON_KEY && env.SUPABASE_SERVICE_ROLE);
  const redis = !!(env.UPSTASH_REDIS_REST_URL && env.UPSTASH_REDIS_REST_TOKEN);
  const stripe = !!(env.STRIPE_SECRET_KEY && env.STRIPE_WEBHOOK_SECRET);
  return { supabase, redis, stripe };
}
var clientEnvSchema = envSchema.pick({
  NEXT_PUBLIC_SUPABASE_URL: true,
  NEXT_PUBLIC_SUPABASE_ANON_KEY: true
});
function validateClientEnv(env = process.env) {
  const result = clientEnvSchema.safeParse(env);
  if (!result.success) {
    console.error("\u274C Invalid client environment variables:");
    console.error(result.error.format());
    throw new Error("Invalid client environment variables");
  }
  return result.data;
}

// src/supabase.ts
var import_supabase_js = require("@supabase/supabase-js");
function createClientAnon() {
  const env = getEnv();
  return (0, import_supabase_js.createClient)(env.NEXT_PUBLIC_SUPABASE_URL, env.NEXT_PUBLIC_SUPABASE_ANON_KEY, {
    auth: {
      autoRefreshToken: true,
      persistSession: true
    }
  });
}
function createClientService() {
  const env = getEnv();
  return (0, import_supabase_js.createClient)(env.NEXT_PUBLIC_SUPABASE_URL, env.SUPABASE_SERVICE_ROLE, {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  });
}

// src/redis.ts
var import_redis = require("@upstash/redis");
var _redisClient = null;
function getRedisClient() {
  if (!_redisClient) {
    const env = getEnv();
    _redisClient = new import_redis.Redis({
      url: env.UPSTASH_REDIS_REST_URL,
      token: env.UPSTASH_REDIS_REST_TOKEN
    });
  }
  return _redisClient;
}
async function rateLimit(key, limit, window2) {
  console.log(`Rate limit check: ${key}, limit: ${limit}, window: ${window2}s`);
  return true;
}
async function cacheGet(key) {
  try {
    const redis = getRedisClient();
    const value = await redis.get(key);
    return value;
  } catch (error) {
    console.error("Cache get error:", error);
    return null;
  }
}
async function cacheSet(key, value, options = {}) {
  try {
    const redis = getRedisClient();
    if (options.ttl) {
      await redis.setex(key, options.ttl, JSON.stringify(value));
    } else {
      await redis.set(key, JSON.stringify(value));
    }
  } catch (error) {
    console.error("Cache set error:", error);
  }
}
async function cacheDel(key) {
  try {
    const redis = getRedisClient();
    await redis.del(key);
  } catch (error) {
    console.error("Cache delete error:", error);
  }
}

// src/stripe.ts
var import_stripe = __toESM(require("stripe"));
var _stripe = null;
function getStripeClient() {
  if (!_stripe) {
    const env = getEnv();
    _stripe = new import_stripe.default(env.STRIPE_SECRET_KEY, {
      apiVersion: "2023-10-16",
      typescript: true
    });
  }
  return _stripe;
}
function validateWebhookSignature(body, signature, secret) {
  const stripe = getStripeClient();
  try {
    return stripe.webhooks.constructEvent(body, signature, secret);
  } catch (error) {
    console.error("Stripe webhook signature validation failed:", error);
    throw new Error("Invalid webhook signature");
  }
}
async function createPortalSession(customerId, returnUrl) {
  const stripe = getStripeClient();
  const session = await stripe.billingPortal.sessions.create({
    customer: customerId,
    return_url: returnUrl
  });
  return session.url;
}
async function createCheckoutSession(priceId, customerId, successUrl, cancelUrl) {
  const stripe = getStripeClient();
  const sessionParams = {
    mode: "subscription",
    line_items: [
      {
        price: priceId,
        quantity: 1
      }
    ],
    success_url: successUrl || "https://example.com/success",
    cancel_url: cancelUrl || "https://example.com/cancel"
  };
  if (customerId) {
    sessionParams.customer = customerId;
  }
  const session = await stripe.checkout.sessions.create(sessionParams);
  return session.url || "";
}
async function getCustomerByEmail(email) {
  const stripe = getStripeClient();
  const customers = await stripe.customers.list({
    email,
    limit: 1
  });
  return customers.data[0] || null;
}
async function createCustomer(email, name) {
  const stripe = getStripeClient();
  const customerParams = {
    email
  };
  if (name) {
    customerParams.name = name;
  }
  return stripe.customers.create(customerParams);
}

// src/utils/theme-preference.ts
function getInitialTheme() {
  if (typeof window === "undefined") {
    return "light";
  }
  try {
    const stored = localStorage.getItem("theme");
    if (stored === "light" || stored === "dark" || stored === "system") {
      return stored;
    }
  } catch (error) {
    console.warn("Failed to read theme from localStorage:", error);
  }
  return "light";
}
function setThemePreference(theme) {
  if (typeof window === "undefined") {
    return;
  }
  try {
    localStorage.setItem("theme", theme);
  } catch (error) {
    console.warn("Failed to save theme to localStorage:", error);
  }
}
function getResolvedTheme(theme) {
  if (theme === "system") {
    if (typeof window === "undefined") {
      return "light";
    }
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }
  return theme;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  BILLING_STATUS,
  BILLING_STATUSES,
  BillingSchema,
  CreateProfileDtoSchema,
  CreateProjectDtoSchema,
  CreatePromptDtoSchema,
  CreateSegmentDtoSchema,
  CreateValidatorDtoSchema,
  DEFAULT_LANGUAGE,
  DEFAULT_LOCALE,
  ENTITY_TYPE,
  ERROR_CODE,
  KIND,
  KINDS,
  LANGUAGE,
  LANGUAGES,
  LOCALES,
  PLAN,
  PLANS,
  ProfileSchema,
  ProjectSchema,
  PromptSchema,
  ROLE,
  ROLES,
  SegmentSchema,
  THEME_PREF,
  THEME_PREFS,
  UpdateProfileDtoSchema,
  UpdateProjectDtoSchema,
  UpdatePromptDtoSchema,
  UpdateSegmentDtoSchema,
  UpdateValidatorDtoSchema,
  VISIBILITIES,
  VISIBILITY,
  ValidatorSchema,
  VersionSchema,
  andThen,
  cacheDel,
  cacheGet,
  cacheSet,
  checkIntegrations,
  clientEnvSchema,
  combine,
  conflictError,
  createCheckoutSession,
  createClientAnon,
  createClientService,
  createCustomer,
  createPortalSession,
  en,
  err,
  forbiddenError,
  formatErrorForLogging,
  fromPromise,
  fromThrowable,
  getBestLocale,
  getCustomerByEmail,
  getDict,
  getEnv,
  getHttpStatusCode,
  getInitialTheme,
  getRedisClient,
  getResolvedTheme,
  getStripeClient,
  getTranslation,
  internalError,
  isAppError,
  isErr,
  isOk,
  isValidLocale,
  map,
  mapErr,
  mapProfileToInsert,
  mapProfileToUpdate,
  mapProjectToInsert,
  mapProjectToUpdate,
  mapPromptToInsert,
  mapPromptToUpdate,
  mapSegmentToInsert,
  mapSegmentToUpdate,
  mapToBilling,
  mapToProfile,
  mapToProfiles,
  mapToProject,
  mapToProjects,
  mapToPrompt,
  mapToPrompts,
  mapToSegment,
  mapToSegments,
  mapToValidator,
  mapToValidators,
  mapToVersion,
  mapToVersions,
  mapValidatorToInsert,
  mapValidatorToUpdate,
  notFoundError,
  ok,
  ptBR,
  rateLimit,
  rateLimitError,
  setThemePreference,
  t,
  toAppError,
  unauthorizedError,
  unwrap,
  unwrapOr,
  validateClientEnv,
  validateEnv,
  validateWebhookSignature,
  validationError
});
