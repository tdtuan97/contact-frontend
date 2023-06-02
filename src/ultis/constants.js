export const DEFAULT_FORMAT_DATETIME = 'YYYY-MM-DD HH:mm:ss'
export const DEFAULT_FORMAT_DATE     = 'YYYY-MM-DD'
export const DEFAULT_FORMAT_TIME     = 'HH:mm:ss'
export const YEARLY_FORMAT_TIME      = 'MM-DD HH:mm:ss'

export const FILTER_LAST_24_HOUR   = 'last_24_hour'
export const FILTER_TODAY          = 'today'
export const FILTER_YESTERDAY      = 'yesterday'
export const FILTER_LAST_7_DAYS    = 'last_7_days'
export const FILTER_THIS_WEEK      = 'this_week'
export const FILTER_LAST_30_DAYS   = 'last_30_days'
export const FILTER_THIS_MONTH     = 'this_month'
export const FILTER_LAST_6_MONTHS  = 'last_6_months'
export const FILTER_LAST_12_MONTHS = 'last_12_months'
export const FILTER_THIS_YEAR      = 'this_year'

export const GROUP_BY_HOUR  = 'hour'
export const GROUP_BY_DATE  = 'date'
export const GROUP_BY_MONTH = 'month'

export const DATA_TYPE = {
    ACTUAL_PRODUCTION_AND_IRRADIATION     : 'actual_production_and_irradiation',
    ACTUAL_PR_AND_BUDGET_PR               : 'actual_pr_and_budget_pr',
    ACTUAL_PRODUCTION_VS_BUDGET_PRODUCTION: 'actual_production_vs_budget_production',
    CARBON_OFFSET                         : 'carbon_offset',
    INVERTER_MONITORING                   : 'inverter_monitoring',
    INVERTER_PERFORMANCE                  : 'inverter_performance',
    GAUGES_MONITORING                     : 'gauges_monitoring',
    GAUGES_PERFORMANCE                    : 'gauges_performance',
    SPECIFIC_YIELD                        : 'specific_yield',
    PERFORMANCE_RATIO_TRACKING            : 'performance_ratio_tracking',
    DAILY_IO_DIAGRAM                      : 'daily_io_diagram',
    STRING_MONITORING                     : 'string_monitoring',
    IV_CURVE                              : 'iv_curve',
}

export const ROLES = {
    SYSTEM_ADMIN                     : "SA",
    ENERGY_MANAGER                   : "EM",
    ASSET_MANAGER                    : "AM",
    OPERATION_AND_MAINTENANCE_MANAGER: "O&M",
}

export const SOCKET_EMIT = {
    AUTO_REFRESH_DATA: "AUTO_REFRESH_DATA_",
}

export const REPORT_TYPE = {
    PLANT_REPORT : 'PLANT_REPORT',
    DEVICE_REPORT: 'DEVICE_REPORT',
}

export const PATTERN_TYPE = {
    DAILY  : "DAILY",
    WEEKLY : "WEEKLY",
    MONTHLY: "MONTHLY",
    YEARLY : "YEARLY",
}

export const TIME_PERIOD = {
    MONTHLY: "M",
    YEARLY : "Y",
    WEEK   : "W",
}

export const REPORT_FILE_TYPE = {
    PDF  : "PDF",
    EXCEL: "EXCEL",
}
