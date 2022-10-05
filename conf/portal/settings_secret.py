"""
All secret values (eg. configurable per project) - usually stored in UT stache.
"""

########################
# DJANGO SETTINGS COMMON
########################

_SECRET_KEY = 'CHANGE ME !'

########################
# DJANGO SETTINGS LOCAL
########################

# Database.
_DJANGO_DB_ENGINE = 'django.db.backends.postgresql'
_DJANGO_DB_HOST = 'core_portal_postgres'
_DJANGO_DB_PORT = '5432'
_DJANGO_DB_NAME = 'dev'
_DJANGO_DB_USER = 'dev'
_DJANGO_DB_PASSWORD = 'dev'

# TAS Authentication.
_TAS_URL = 'https://tas.tacc.utexas.edu/api'
_TAS_CLIENT_KEY = 'tasportal_dev'
_TAS_CLIENT_SECRET = 'sK^_E/h-U3a:vu@m'

# Redmine Tracker Authentication.
_RT_HOST = 'https://consult.tacc.utexas.edu/REST/1.0'
_RT_UN = 'rtdev'
_RT_PW = 'ckIPIs#YH@g*Zdv873UqgmzXPVFqzRGj'

########################
# AGAVE SETTINGS
########################

# Admin account
_PORTAL_ADMIN_USERNAME = 'wma_prtl'

# Agave Tenant.
_AGAVE_TENANT_ID = 'portals'
_AGAVE_TENANT_BASEURL = 'https://portals-api.tacc.utexas.edu'

# cep.test Agave Client Configuration
_AGAVE_CLIENT_KEY = 'Y13yFqJff0kc0yYPLYcXhGyDLqca'
_AGAVE_CLIENT_SECRET = 'zZf8vmTCkJfInuiiF8VsVbMksV4a'
_AGAVE_SUPER_TOKEN = 'adf699ddd9d3de1552f98d1b1fad210'

########################
# TAPIS v3 SETTINGS
# NOTE: ONLY USED FOR TAPIS V3 DEVELOPMENT.
# YOU CAN IGNORE THIS FOR TAPIS V2 DEVELOPMENT.
########################

# Tapis Tenant.
_TAPIS_TENANT_BASEURL = 'https://a2cps.tapis.io'

# Tapis Client Configuration
_TAPIS_CLIENT_ID = 'A2CPS_DEV'
_TAPIS_CLIENT_KEY = 'z59KRPOp51YrG'

########################
# RABBITMQ SETTINGS
########################

_BROKER_URL_USERNAME = 'dev'
_BROKER_URL_PWD = 'dev'
_BROKER_URL_HOST = 'core_portal_rabbitmq'
_BROKER_URL_PORT = '5672'
_BROKER_URL_VHOST = 'dev'

########################
# ELASTICSEARCH SETTINGS
########################

_ES_HOSTS = 'core_portal_elasticsearch:9200'
_ES_AUTH = 'dev:invective jump payable soul'
_ES_INDEX_PREFIX = 'cep-dev-{}'

########################
# CELERY SETTINGS
########################

_RESULT_BACKEND_HOST = 'core_portal_redis'
_RESULT_BACKEND_PORT = '6379'
_RESULT_BACKEND_DB = '0'

#######################
# PROJECTS SETTINGS
#######################

_PORTAL_PROJECTS_PRIVATE_KEY = (
    '-----BEGIN RSA PRIVATE KEY-----\n'
    'MIIEpgIBAAKCAQEAw7jo2mEDupJ1BzT7Qx3bZg40yVTj3eVRRZ3rTrohSwjJuwIj\n'
    'NSuBIUJuC1r0ic4fV4IFRzatZz2ley2AGhv/Dy1aD28rhduId9npjCbVlPVYqXOl\n'
    'j+ikZm46wR4xfL7eBpEg+4E+ZW2/Qe/g4C1rWjIWCmlaXG1ibG3D9p+gKGB2ei20\n'
    'jVAY3cdMeoKVZGbUKSIrVPN0hCwOimyEGpSRTJI8LH3TvfpxdCaPtRMTsz21awcf\n'
    'J1K0I+VVvgJnWI0mo5UwxpyZ0zUQgZLMk/wt2tVNEPbXacZ5lODHsKVqPrLRNyd/\n'
    'IkP2QdO1QAliHEPBDe/P37bM88Zn2Dh7OYIcbQIDAQABAoIBAQCkz0Y07dCIAN/O\n'
    '68xQ3glrzLaientO1NU0/B+zMYTrfEDy2n/vO+0GprunkDWu/QTjWTc8mkw2TXDV\n'
    'YqEmW0DR9OyLZp+NnikyUysYu3LKdjbsqddWcR5Oqq+LAvPFCaxId1kAr/psypds\n'
    '3KPN4jEtyFNK/R/8CJgCmgOT3yKsG+LlREVXTslC7jy/XtXDw7+fSC65g1+RcDsd\n'
    'l+qC1uaxWQvtmefgiI2etfIafl0j06iun/hccvmtBr0vhAFbjw5IizeQ7SPRckZq\n'
    'pMftXgQfFj9m40mZ4Zqo4iOMdUHDsrHHr4URL9uUrudV8t0t5SuWjyz9JAp5KuWD\n'
    'Tecq5MPBAoGBAPtTm2IVS067P1LtSj8YI5yGuZPOhBfP7mUqH/1wkxo7N6UT44xX\n'
    'MSOIfN+fx1gaZlukPS2tw7TeC/lJ/hJ18FKm73c9Pnysb/RsXQAOre65rsex6s/6\n'
    'gHsM2sLTOrqldVpDZQyFvJtnrESPIJLzC9kUGkT98fM0NrJKwftyDZgZAoGBAMdc\n'
    'm924UmxBR6KmK3axYfUNgIwDTaazCSNOAf0Gkny8PcbpEt0h7NZaT5aRQzLx1rCK\n'
    'V2yBMn0NAwkg/DDjwtlQbW1UKnrc6N3cuyw13F/RrQSLgKqMzt2q242KnAFXEb2/\n'
    'qL60OD/hHC+tmwnGKvm09k3hJH8P8kghWjWNv4F1AoGBAPVxokb4qtIZ9e7DxIW3\n'
    'yld8D1J1FfW3YIc1y4YUYeT1PhOeR9Rv9pJQIju2a9Tz+1C2JfUtRPqm+6SaiWF4\n'
    'ApqFY0nc6uCQ+skG5xA+RcjlV/a4H6y7ZKxHUoGADlPncKMVPGMtXJOcfNV7vgEl\n'
    'EUYP5tPH+XldXaljbuxkZzhJAoGBAJAbfDuoOkQwZ+TFcxOII0Ps76fF14KRViCk\n'
    'CcHp10e9FnbLEayxEi7b9z3iYQ3ZTJQuXAV92o4UMsaNhl6ctMM7ZO4rcc2AFAAT\n'
    'x2SsxlCpEwT/BhHCWOJY1/2XXS+Gzbc4bHT1dteOFD7OogxNp9D6ozQmc6g5Uawc\n'
    'F8YwYWblAoGBANY/+NKOiWaP8w2BY3msis+RCHLzzRx6OEpn+xHvxcZHI0X9csAD\n'
    '8LwSqvxHphvBGMzpr5PXQqTJGwQO02xdoe2238tz79/FDeBGHeKAdEkniaP+rn4A\n'
    'ueejQBtbq2xTk0KbY5xbxFHwhBsYSR9IrvdlPbyi+q4to8qWsgaPlSlM\n'
    '-----END RSA PRIVATE KEY-----'
)

_PORTAL_PROJECTS_PUBLIC_KEY = (
    'ssh-rsa '
    'AAAAB3NzaC1yc2EAAAADAQABAAABAQDDuOjaYQO6knUHNPtDHdtmDjTJVOPd5VFFnetO'
    'uiFLCMm7AiM1K4EhQm4LWvSJzh9XggVHNq1nPaV7LYAaG/8PLVoPbyuF24h32emMJtWU'
    '9Vipc6WP6KRmbjrBHjF8vt4GkSD7gT5lbb9B7+DgLWtaMhYKaVpcbWJsbcP2n6AoYHZ6'
    'LbSNUBjdx0x6gpVkZtQpIitU83SELA6KbIQalJFMkjwsfdO9+nF0Jo+1ExOzPbVrBx8n'
    'UrQj5VW+AmdYjSajlTDGnJnTNRCBksyT/C3a1U0Q9tdpxnmU4MewpWo+stE3J38iQ/ZB'
    '07VACWIcQ8EN78/ftszzxmfYOHs5ghxt wma_prtl.projects'
)


########################
# EXTERNAL DATA RESOURCES SETTINGS
########################

# NOTE: set 'name' to that of the custom data api,
# keeping 'directory' set as 'external-resources'.
# The key of each system should be equivalent to the NAME of the FileManager.

# NOTE: Kept as a secret setting so portals can decide what external
# resources to have available.

# For google drive secrets, go to https://console.cloud.google.com/apis

_EXTERNAL_RESOURCE_SECRETS = {
    "google-drive": {
        "client_secret": "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",
        "client_id": "428879134432-hkjhstfe39lj5o0o8l6s57ut0ql4aks5.apps.googleusercontent.com",
        "name": "Google Drive",
        "directory": "external-resources"
    }
}


########################
# reCAPTCHA SETTINGS
########################
_RECAPTCHA_SECRET_KEY = "6LfNPcQcAAAAAOJYXO3XAk2BNGunXfc_cD28PFWI"
_RECAPTCHA_SITE_KEY = "6LfNPcQcAAAAAKlC-9a_MBUL0BlxarXDWFCSbxtV"
