original_dict = {
    '0': ['o', 'ο', 'Ο', 'о'],
    '1': ['l', 'I', '|', '!', 'ι', 'ί', 'І'],
    '2': ['z', 'ζ', 'З', 'з'],
    '3': ['e', 'ε', 'Ε'],
    '4': ['a', 'Α', 'а'],
    '5': ['s', 'Σ', 'ѕ', 'ς'],
    '6': ['b', 'Β', 'б'],
    '7': ['t', 'τ', 'Τ'],
    '8': ['b', 'Β', 'в'],
    '9': ['g', 'Γ', 'г'],
    'i': ['l', '1', 'I', '|', '!', 'ί', 'і'],
    'o': ['0', 'ο', 'Ο', 'о'],
    'l': ['1', 'I', '|', '!', 'ι', 'ί', 'І'],
    'z': ['2', 'ζ', 'З', 'з'],
    's': ['5', 'Σ', 'ѕ', 'ς'],
    't': ['7', 'τ', 'Τ'],
    'g': ['9', 'Γ', 'г'],
    'c': ['с', 'с', 'ς', 'С', 'С'],
    'p': ['р', 'р', 'Р'],
    'a': ['а', 'а', 'A', 'A'],
    'e': ['е', 'е', 'E', 'E'],
    'x': ['х', 'х', 'X', 'Х'],
    'y': ['у', 'у', 'Y', 'Υ'],
    'k': ['κ', 'κ', 'K', 'Κ'],
    'm': ['м', 'м', 'M', 'М'],
    'H': ['н', 'н', 'Н'],
    'i': ['і', 'і', 'I', 'І']
}

flattened_dict = {value: key for key, values in original_dict.items() for value in values}

print(flattened_dict)
