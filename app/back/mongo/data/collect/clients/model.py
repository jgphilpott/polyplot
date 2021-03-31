from os import urandom

class Client():

    def __init__(self, client):

        self.email = client["email"]
        self.password = client["password"]

        if "id" in client: self.id = client["id"]

        if "settings" in client:

            self.settings = client["settings"]

        else:

            self.settings = {

                "panels": {
                    "countries": False,
                    "indicators": False,
                    "layers": False,
                    "legend": True,
                    "line": True,
                    "map": True,
                    "meta": True,
                    "time": True,
                    "title": True
                },

                "general": {
                    "countryExceptions": [],
                    "indicatorExceptions": ["SP.POP.TOTL","SP.DYN.LE00.IN","SP.DYN.TFRT.IN","NY.GDP.PCAP.KD.ZG","AG.LND.AGRI.K2","AG.YLD.CREL.KG","AG.PRD.CROP.XD","AG.SRF.TOTL.K2","SH.DYN.MORT","DC.DAC.TOTL.CD","DC.DAC.DEUL.CD","DT.ODA.ALLD.KD","DT.ODA.ALLD.CD","EN.URB.LCTY.UR.ZS","EN.POP.DNST","EN.URB.LCTY","SP.URB.TOTL","SP.URB.TOTL.IN.ZS","SP.URB.GROW","TM.VAL.MRCH.R3.ZS","TM.VAL.MRCH.R4.ZS","TM.VAL.MRCH.R5.ZS","TX.VAL.MRCH.CD.WT","TX.VAL.MRCH.WL.CD","SL.TLF.ACTI.1524.FE.ZS","SL.TLF.ACTI.1524.MA.ZS","SL.UEM.TOTL.MA.ZS","SL.TLF.CACT.MA.ZS","BM.GSR.ROYL.CD","BX.GSR.ROYL.CD","SP.POP.TECH.RD.P6","IP.JRN.ARTC.SC","SG.LAW.NODC.HR","SG.LAW.EQRM.WK","SG.LEG.DVAW","MS.MIL.XPND.CN","TX.VAL.MRCH.R1.ZS","TX.VAL.MRCH.HI.ZS","SI.DST.02ND.20","SI.DST.FRST.20","SI.DST.FRST.10","SI.DST.03RD.20","IT.MLT.MAIN","IT.MLT.MAIN.P2","IT.CEL.SETS","IT.CEL.SETS.P2","SP.ADO.TFRT","SP.POP.DPND","SP.POP.DPND.OL","SP.POP.DPND.YG","BX.KLT.DINV.WD.GD.ZS","BX.KLT.DINV.CD.WD","FM.LBL.BMNY.GD.ZS","FM.LBL.BMNY.CN","DT.ODA.ODAT.PC.ZS","DT.NFL.PROP.CD","BX.TRF.PWKR.CD.DT","BX.PEF.TOTL.CD.WD","EN.ATM.CO2E.SF.ZS","EN.ATM.CO2E.SF.KT","NY.ADJ.DMIN.CD","AG.LND.AGRI.ZS","AG.LND.TOTL.K2"],
                    "countryDescription": True,
                    "indicatorDescription": True,
                    "indicatorRelevance": False,
                    "indicatorMethodology": False,
                    "indicatorLimitations": False,
                    "rotation": False
                },

                "poly3": {
                    "caps": True
                },

                "poly2": {
                    "crosshairs": True
                },

                "map": {
                    "airports": False,
                    "cities": True,
                    "graticules": False,
                    "lakes": True,
                    "ports": False,
                    "railroads": False,
                    "rivers": True,
                    "roads": False
                }

            }

    def refresh_id(self):

        self.id = urandom(42).hex()

        return self

    def update_settings(self, category, setting, value):

        self.settings[category][setting] = value

        return self
