
# Pi Day API

This is a simple API created to celebrate Pi Day, providing an endpoint that serves the first 10,000 digits of Pi.

## How it works

The API serves Pi digits when you make a GET request to the `/pi` endpoint. The first 3 digits of Pi (`3.14`) are displayed large, and as you scroll down, more digits are shown in decreasing font size, giving the appearance of "infinite" digits of Pi.

### Key Features:
- FastAPI backend.
- Endpoint `/pi` for getting Pi digits.

## Usage

To access the Pi digits, send a GET request to the `/pi` endpoint.

Example:

```
GET https://piday-api.onrender.com/pi
```

The response will return the first 10,000 digits of Pi in JSON format:

```json
{
  "pi": "3.14159... (10,000 digits)"
}
```

Enjoy scrolling through Pi and celebrate Pi Day!

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Repository

GitHub Repository: [github.com/jaopdc11/piday-api](https://github.com/jaopdc11/piday-api)
