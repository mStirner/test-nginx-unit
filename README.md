## "Deploy" application

```sh
sudo curl -X PUT --data-binary @application.json --unix-socket /var/run/control.unit.sock http://localhost/config
sudo curl -X GET --unix-socket /var/run/control.unit.sock http://localhost/config
curl http://127.0.0.1:8300
sudo curl -X DELETE --data-binary @multiple-apps.json --unix-socket /var/run/control.unit.sock http://localhost/config
```