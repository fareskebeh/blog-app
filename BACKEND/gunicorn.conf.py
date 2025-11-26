import multiprocessing

bind = "0.0.0.0:8000"
backlog = 2048

workers = multiprocessing.cpu_count() *2 +1
worker_class = "sync"
worker_connections = 1000
max_requests=1000
max_requests_jitter=50
timeout=30
graceful_timeout=30
keepalive=2

access_log = "-"
error_log = "-"
loglevel= 'info'

proc_name= "blog"

daemon = False
pidfile= None
umask=0
user=None
group=None
tmp_upload_dir=None