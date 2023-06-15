export GPAO_API_URL=localhost
export GPAO_API_PORT=8080

if [ "$(docker ps -aq -f name=monitor-gpao)" ]; then
    echo "Suppression du container monitor-gpao"
    docker rm -f monitor-gpao
fi

npm run dev
