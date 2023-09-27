import socket

def reverse_dns_lookup(url):
    try:
        ip_address = socket.gethostbyname(url)
        hostnames = socket.gethostbyaddr(ip_address)
        return hostnames
    except socket.herror as e:
        return str(e)

# Get the URL from user input
url = input("Enter the domain URL (e.g., example.com): ")

result = reverse_dns_lookup(url)

print(f"Result: {result}")
