import psycopg2 as psycopg

# Connect to your postgres DB
conn = psycopg.connect("dbname=pstack user=pstack password=development")

def sync_one():
     cur = conn.cursor()

     # raises exception if you try to load latest before pegnet price is available
     res = cur.execute("SELECT sync_block()")
     conn.commit()
     return  cur.fetchone()[0]


while True:
  print(sync_one())
