import os
import json

folder = "Nirvana Songs"

songs = []

for file in os.listdir(folder):

    if file.lower().endswith((".mp3", ".wav", ".ogg", ".flac")):

        name = os.path.splitext(file)[0]

        songs.append({
            "name": name,
            "file": f"{folder}/{file}"
        })

with open("songs.js", "w", encoding="utf-8") as f:
    f.write("const songs = ")
    json.dump(songs, f, indent=4)
    f.write(";")