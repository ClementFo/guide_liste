import json
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from typing import Any
from urllib.parse import urlparse

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware


class api:
    def __init__(self) -> None:
        self.users_file = (
            Path(__file__).resolve().parent.parent / "datas" / "users.json"
        )

    def _load_users(self) -> list[dict[str, Any]]:
        if not self.users_file.exists():
            raise FileNotFoundError(
                f"Le fichier des utilisateurs est introuvable : {self.users_file}"
            )

        with self.users_file.open(encoding="utf-8") as file:
            data = json.load(file)

        return data.get("users", [])

    def _save_users(self, users: list[dict[str, Any]]) -> None:
        with self.users_file.open("w", encoding="utf-8") as file:
            json.dump({"users": users}, file, ensure_ascii=False, indent=4)
            file.write("\n")

    def login(self, payload: dict[str, Any]) -> dict[str, Any]:
        email = (payload.get("email") or "").strip().lower()
        password = payload.get("password")

        if not email or not password:
            raise ValueError("Email et mot de passe requis")

        users = self._load_users()
        user = next(
            (
                current_user
                for current_user in users
                if current_user.get("email", "").lower() == email
                and current_user.get("password") == password
            ),
            None,
        )

        if user is None:
            raise PermissionError("Identifiants invalides")

        return {"message": "Connexion réussie", "user": {"email": user["email"]}}

    def new_user(self, payload: dict[str, Any]) -> dict[str, Any]:
        email = (payload.get("email") or "").strip().lower()
        password = payload.get("password")
        role = payload.get("role") or "User"

        if not email or not password:
            raise ValueError("Email et mot de passe requis")

        users = self._load_users()
        if any(
            current_user.get("email", "").lower() == email for current_user in users
        ):
            raise KeyError("Cet utilisateur existe déjà")

        new_user = {
            "id": len(users) + 1,
            "email": email,
            "password": password,
            "role": role,
        }
        users.append(new_user)
        self._save_users(users)

        return {
            "message": "Utilisateur créé avec succès",
            "user": {"email": email, "role": role},
        }


back_end = FastAPI()
back_end.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://127.0.0.1:3000"],
    allow_credentials=True,
    allow_methods=["POST", "OPTIONS"],
    allow_headers=["Content-Type"],
)

api_back = api()


@back_end.post("/login")
async def login(payload: dict[str, Any]) -> dict[str, Any]:
    try:
        return api_back.login(payload)
    except ValueError as exc:
        raise HTTPException(status_code=400, detail=str(exc))
    except PermissionError as exc:
        raise HTTPException(status_code=401, detail=str(exc))
    except (TypeError, json.JSONDecodeError, FileNotFoundError):
        raise HTTPException(status_code=500, detail="Une erreur est survenue")


@back_end.post("/new_user", status_code=201)
async def new_user(payload: dict[str, Any]) -> dict[str, Any]:
    try:
        return api_back.new_user(payload)
    except ValueError as exc:
        raise HTTPException(status_code=400, detail=str(exc))
    except KeyError as exc:
        raise HTTPException(status_code=409, detail=str(exc))
    except (TypeError, json.JSONDecodeError, FileNotFoundError):
        raise HTTPException(status_code=500, detail="Une erreur est survenue")


def main() -> None:
    print("Serveur démarré sur http://127.0.0.1:8000")


if __name__ == "__main__":
    main()
