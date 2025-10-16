import pandas as pd
ruta = "data/2022_PlebiscitoConstitucional_DatosPlebiscito.xlsx"
df = pd.read_excel(ruta)
df.head()