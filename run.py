from app import create_app
from app.Middleware.logger import loggerMiddleware

app = create_app()
app.wsgi_app = loggerMiddleware(app.wsgi_app)

if __name__ == '__main__':
    app.run(use_reloader=True, debug=True, host='0.0.0.0', port=5000)
