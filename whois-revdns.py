import socket
import whois
import datetime

def reverse_dns_lookup(url):
    try:
        ip_address = socket.gethostbyname(url)
        hostnames = socket.gethostbyaddr(ip_address)
        return hostnames
    except socket.herror as e:
        return str(e)

def get_domain_age(url):
    w = whois.whois(url)
    creation_date = w.creation_date
    if type(creation_date) == list:
        creation_date = creation_date[0]
    age = (datetime.datetime.now() - creation_date).days
    return age

if __name__ == "__main__":
    # Get the URL from user input
    url = input("Enter the domain URL (e.g. - example.com): ")

    # Perform reverse DNS lookup
    dns_result = reverse_dns_lookup(url)
    print(f"Reverse DNS for '{url}': {dns_result}")

    # Calculate domain age
    age_in_days = get_domain_age(url)
    print(f"The age of '{url}' is {age_in_days} days.")
