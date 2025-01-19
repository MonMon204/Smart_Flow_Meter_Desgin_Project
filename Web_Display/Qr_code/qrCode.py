import qrcode

def generate_wifi_qr(ssid, password, security_type="WPA", output_file="wifi_qr.png"):
    """
    Generate a Wi-Fi QR code.
    
    Args:
        ssid (str): The name of the Wi-Fi network.
        password (str): The Wi-Fi password.
        security_type (str): The security type of the network (WPA, WEP, or nopass).
        output_file (str): The file name for the generated QR code image.
    """
    # Wi-Fi QR code format: WIFI:T:<security>;S:<SSID>;P:<password>;H:<hidden>;
    qr_data = f"WIFI:T:{security_type};S:{ssid};P:{password};;"
    
    # Generate the QR code
    qr = qrcode.QRCode(
        version=1,  # Version of the QR Code (1-40), where higher numbers mean more data.
        error_correction=qrcode.constants.ERROR_CORRECT_H,
        box_size=10,  # Size of each box in the QR code grid.
        border=4,  # Thickness of the border (minimum is 4).
    )
    qr.add_data(qr_data)
    qr.make(fit=True)

    # Create the image of the QR code
    img = qr.make_image(fill="black", back_color="white")

    # Save the image
    img.save(output_file)
    print(f"Wi-Fi QR code saved as {output_file}")

# Example usage
ssid = "Mina204"
password = "A/n/K/l/M/c-27/8"
generate_wifi_qr(ssid, password)
