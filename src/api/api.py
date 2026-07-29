import json
from pathlib import Path
from typing import Any

from fastapi import FastAPI, HTTPException


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

    def login(self, request: Any):
        try:
            if isinstance(request, dict):
                payload = request
            else:
                payload = request.json()

            email = (payload.get("email") or "").strip().lower()
            password = payload.get("password")

            if not email or not password:
                raise HTTPException(
                    status_code=400, detail="Email et mot de passe requis"
                )

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
                raise HTTPException(status_code=401, detail="Identifiants invalides")

            return {"message": "Connexion réussie", "user": {"email": user["email"]}}
        except HTTPException:
            raise
        except (ValueError, TypeError, json.JSONDecodeError) as exc:
            raise HTTPException(
                status_code=500,
                detail="Une erreur est survenue lors de l'authentification",
            ) from exc

    def new_user(self, request: Any):
        try:
            if isinstance(request, dict):
                payload = request
            else:
                payload = request.json()

            email = (payload.get("email") or "").strip().lower()
            password = payload.get("password")
            role = payload.get("role") or payload.get("role") or "User"

            if not email or not password:
                raise HTTPException(
                    status_code=400, detail="Email et mot de passe requis"
                )

            users = self._load_users()
            if any(
                current_user.get("email", "").lower() == email for current_user in users
            ):
                raise HTTPException(
                    status_code=409, detail="Cet utilisateur existe déjà"
                )

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
        except HTTPException:
            raise
        except (ValueError, TypeError, json.JSONDecodeError) as exc:
            raise HTTPException(
                status_code=500,
                detail="Une erreur est survenue lors de la création de l'utilisateur",
            ) from exc


back_end = FastAPI(title="api")
api_back = api()


@back_end.post("/login")
def authenticate(payload: dict[str, Any]):
    return api_back.login(payload)


@back_end.post("/new_user")
def create_user(payload: dict[str, Any]):
    return api_back.new_user(payload)
