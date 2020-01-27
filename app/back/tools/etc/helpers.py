def dict_in_list(list, dict, key):

    return [obj for obj in list if obj[key] in [dict[key]]]
