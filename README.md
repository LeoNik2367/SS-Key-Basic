# 🔐 SS-Key-Basic

This repository contains a simplified implementation of Shamir's Secret Sharing scheme using Lagrange's interpolation. The project demonstrates how to split a secret key into multiple parts (shares) and then reconstruct the original key using a subset of these shares. 

## Overview 📝

Shamir's Secret Sharing is a cryptographic algorithm that allows you to divide a secret into multiple shares, with the property that any subset of the shares (of a predetermined size) can be used to reconstruct the original secret, but smaller subsets yield no information about the secret.

This project implements the core algorithm and provides a fully responsive website 🌐 where users can input the necessary shares to reconstruct the original key. The reconstruction process is done by reading the shares from a JSON file.

## Features 🚀

- **Lagrange Interpolation**: The secret is reconstructed using Lagrange's interpolation, a polynomial-based method.
- **Responsive Website**: The interface is designed to be fully responsive, allowing seamless access across devices 📱💻.
- **JSON-based Input**: Shares are input via a JSON file, making it easy to manage and handle multiple shares 🗂️.
- **Output**: The original secret key is reconstructed and displayed as the output 🔓.

## Getting Started 💻

### Prerequisites 📋

- A web browser to access the website.

### Installation ⚙️

1. **Clone the repository:**

   ```bash
   git clone https://github.com/LeoNik2367/SS-Key-Basic.git
   ```
2. **Navigate to the project directory:**

   ```bash
   cd SS-Key-Basic
   ```

3. **Open the website:**

   - You can open the `index.html` file in any web browser.

### Usage 🛠️

1. **Upload the JSON file containing the shares:**

   - The website provides an interface to upload the JSON file that contains the shares 📄.

2. **Reconstruct the Secret Key 🔧:**

   - Once the shares are uploaded, the website will process the data using Lagrange's interpolation to reconstruct the original secret key.

3. **View the Output 🔍:**

   - The reconstructed secret key will be displayed on the website.

## Example 💡

Here’s a simple example of how the JSON file should look:

```json
{
  "shares": [
    {"x": 1, "y": 12345},
    {"x": 2, "y": 67890},
    {"x": 3, "y": 54321}
  ]
}
```

Upload this JSON file via the website to reconstruct the key 🔑.

## Contributing 🤝

Contributions are welcome! If you find a bug 🐛 or want to add a feature ✨, feel free to open an issue or submit a pull request.

## License 📜

This project is licensed under the MIT License.

---
