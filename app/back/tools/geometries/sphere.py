from back.tools.etc.helpers import dict_in_list
from back.mongo.data.collect.indexes import find_index

def spherify(r_index="SP.POP.TOTL", x_index="NY.GDP.PCAP.KD.ZG", y_index="SE.ADT.LITR.ZS", z_index="MS.MIL.XPND.GD.ZS"):

    geos = []

    for geo in find_index(r_index)["geographies"]:

        matches = dict_in_list(geos, geo, "code")

        if matches:

            matches[0]["r"] = geo["history"]

        else:

            geos.append({"code": geo["code"], "r": geo["history"]})

    for geo in find_index(x_index)["geographies"]:

        matches = dict_in_list(geos, geo, "code")

        if matches:

            matches[0]["x"] = geo["history"]

        else:

            geos.append({"code": geo["code"], "x": geo["history"]})

    for geo in find_index(y_index)["geographies"]:

        matches = dict_in_list(geos, geo, "code")

        if matches:

            matches[0]["y"] = geo["history"]

        else:

            geos.append({"code": geo["code"], "y": geo["history"]})

    for geo in find_index(z_index)["geographies"]:

        matches = dict_in_list(geos, geo, "code")

        if matches:

            matches[0]["z"] = geo["history"]

        else:

            geos.append({"code": geo["code"], "z": geo["history"]})

    return geos
