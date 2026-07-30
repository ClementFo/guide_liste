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
        self.guides_file = (
            Path(__file__).resolve().parent.parent / "datas" / "guideList.json"
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

    def _load_guides(self) -> list[dict[str, Any]]:
        if not self.guides_file.exists():
            raise FileNotFoundError(
                f"Le fichier des guides est introuvable : {self.guides_file}"
            )

        with self.guides_file.open(encoding="utf-8") as file:
            data = json.load(file)

        return data.get("users", [])

    def _save_guides(self, guides: list[dict[str, Any]]) -> None:
        with self.guides_file.open("w", encoding="utf-8") as file:
            json.dump({"users": guides}, file, ensure_ascii=False, indent=4)
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

        return {
            "message": "Connexion réussie",
            "user": {"email": user["email"], "role": user.get("role", "User")},
        }

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

    def new_guide(self, payload: dict[str, Any]) -> dict[str, Any]:
        guides = self._load_guides()

        title = (payload.get("title") or "").strip()
        description = (payload.get("description") or "").strip()
        jour_value = payload.get("jour")
        mobilité = payload.get("mobilité") or payload.get("mobilite") or ""
        saison = (payload.get("saison") or "").strip()
        activité = payload.get("activité") or payload.get("activite") or []
        userListe = payload.get("userListe") or []

        if not title or not description or jour_value is None:
            raise ValueError("Titre, description et jour sont requis")

        new_guide = {
            "id": max((guide.get("id", 0) for guide in guides), default=0) + 1,
            "title": title,
            "description": description,
            "jour": int(str(jour_value).strip()),
            "mobilité": mobilité,
            "saison": saison,
            "activité": activité,
            "userListe": userListe,
        }

        guides.append(new_guide)
        self._save_guides(guides)

        return {"message": "Guide créé avec succès", "guide": new_guide}

    def get_guides(self) -> list[dict[str, Any]]:
        return self._load_guides()

    def get_guide(self, guide_id: int) -> dict[str, Any]:
        guides = self._load_guides()
        guide = next((item for item in guides if item.get("id") == guide_id), None)
        if guide is None:
            raise KeyError("Guide introuvable")
        return guide

    def edit_guide(self, payload: dict[str, Any]) -> dict[str, Any]:
        guides = self._load_guides()
        guide_id = payload.get("id")

        if guide_id is None:
            raise ValueError("Identifiant du guide requis")

        guide = next((item for item in guides if item.get("id") == guide_id), None)
        if guide is None:
            raise KeyError("Guide introuvable")

        if payload.get("title") is not None:
            guide["title"] = str(payload.get("title")).strip()
        if payload.get("description") is not None:
            guide["description"] = str(payload.get("description")).strip()
        if payload.get("jour") is not None:
            jour_value = payload.get("jour")
            guide["jour"] = int(str(jour_value).strip())
        if payload.get("mobilité") is not None or payload.get("mobilite") is not None:
            guide["mobilité"] = payload.get("mobilité") or payload.get("mobilite") or ""
        if payload.get("saison") is not None:
            guide["saison"] = str(payload.get("saison")).strip()
        if payload.get("activité") is not None or payload.get("activite") is not None:
            guide["activité"] = payload.get("activité") or payload.get("activite") or []
        if payload.get("userListe") is not None:
            guide["userListe"] = payload.get("userListe")

        self._save_guides(guides)

        return {"message": "Guide modifié avec succès", "guide": guide}

    def delete_guide(self, payload: dict[str, Any]) -> dict[str, Any]:
        guides = self._load_guides()
        guide_id = payload.get("id")

        if guide_id is None:
            raise ValueError("Identifiant du guide requis")

        guide = next((item for item in guides if item.get("id") == guide_id), None)
        if guide is None:
            raise KeyError("Guide introuvable")

        guides = [item for item in guides if item.get("id") != guide_id]
        self._save_guides(guides)

        return {"message": "Guide supprimé avec succès", "id": guide_id}


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


@back_end.post("/new_guide", status_code=201)
async def new_guide(payload: dict[str, Any]) -> dict[str, Any]:
    try:
        return api_back.new_guide(payload)
    except ValueError as exc:
        raise HTTPException(status_code=400, detail=str(exc))
    except PermissionError as exc:
        raise HTTPException(status_code=401, detail=str(exc))
    except (TypeError, json.JSONDecodeError, FileNotFoundError):
        raise HTTPException(status_code=500, detail="Une erreur est survenue")


@back_end.get("/guides")
async def get_guides() -> dict[str, Any]:
    try:
        return {"guides": api_back.get_guides()}
    except (TypeError, json.JSONDecodeError, FileNotFoundError):
        raise HTTPException(status_code=500, detail="Une erreur est survenue")


@back_end.get("/guides/{guide_id}")
async def get_guide(guide_id: int) -> dict[str, Any]:
    try:
        return {"guide": api_back.get_guide(guide_id)}
    except KeyError as exc:
        raise HTTPException(status_code=404, detail=str(exc))
    except (TypeError, json.JSONDecodeError, FileNotFoundError):
        raise HTTPException(status_code=500, detail="Une erreur est survenue")


@back_end.post("/edit_guide", status_code=201)
async def edit_guide(payload: dict[str, Any]) -> dict[str, Any]:
    try:
        return api_back.edit_guide(payload)
    except ValueError as exc:
        raise HTTPException(status_code=400, detail=str(exc))
    except KeyError as exc:
        raise HTTPException(status_code=409, detail=str(exc))
    except (TypeError, json.JSONDecodeError, FileNotFoundError):
        raise HTTPException(status_code=500, detail="Une erreur est survenue")


@back_end.post("/delete_guide", status_code=200)
async def delete_guide(payload: dict[str, Any]) -> dict[str, Any]:
    try:
        return api_back.delete_guide(payload)
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
