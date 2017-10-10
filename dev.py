accesslog           = '/code/logs/access.log'
bind                = '0.0.0.0:80'
backlog             = 2048
capture_output      = True
daemon              = False
errorlog            = '/code/logs/error.log'
keepalive           = 2
loglevel            = 'debug'
reload              = True
timeout             = 60
workers             = 1
worker_class        = 'eventlet'
worker_connections  = 1000