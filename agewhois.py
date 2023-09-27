import whois
import datetime

def get_domain_age(url):
    w = whois.whois(url)
    creation_date = w.creation_date
    if type(creation_date) == list:
        creation_date = creation_date[0]
    age = (datetime.datetime.now() - creation_date).days
    return age

url = input("Enter the domain URL (e.g. - example.com): ")
age_in_days = get_domain_age(url)
print(f"The age of '{url}' is {age_in_days} days.")
