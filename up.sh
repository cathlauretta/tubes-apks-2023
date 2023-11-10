# sumber : https://www.linkedin.com/pulse/running-grafana-prometheus-docker-stephen-townshend/
docker run --rm --name my-prometheus --network prometheus_grafana --network-alias prometheus --publish 9090:9090 --volume ${pwd}\prometheus.yml:/etc/prometheus/prometheus.yml --detach prom/prometheus
docker run --rm --name grafana --network prometheus_grafana --network-alias grafana --publish 3000:3000 --detach grafana/grafana-oss:latest
docker-compose up --build --remove-orphans -d