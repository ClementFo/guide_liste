import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function UserListPage() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || 'null');
    const isAdmin = currentUser?.role === 'Administrateur';
    const id = currentUser?.id;
    console.log(currentUser)
    const navigate = useNavigate();

    const [userList, setuserList] = useState([]);
    const [loading, setLoading] = useState(true);


    const handleDelete = async () => {
        if (!window.confirm('Voulez-vous vraiment supprimer cet utilisateur ?')) {
            return;
        }

        try {
            const response = await fetch('http://127.0.0.1:8000/delete_user', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id }),
            });

            if (!response.ok) {
                throw new Error('La suppression a échoué');
            }

            navigate('/users');
        } catch (error) {
            console.error(error);
            alert('Impossible de supprimer l\'utilisateur');
        }
    };

    useEffect(() => {
        const fetchUser = async () => {
        try {
            const response = await fetch('http://127.0.0.1:8000/users');

            if (!response.ok) {
                throw new Error('Erreur lors du chargement des users');
            }

            const data = await response.json();
            setuserList(data.users || []);
        } catch (error) {
            console.error(error);
            setuserList([]);
        } finally {
            setLoading(false);
        }
        };

        fetchUser();
    }, []);

    if (loading) {
        return <p>Chargement des users...</p>;
    }

    return (
    <div className="App">
        <h1>Liste des utilisateurs</h1>
        <p>Connecté en tant que : {currentUser?.email || 'Invité'}</p>
        <p>Rôle : {currentUser?.role || 'User'}</p>
        {isAdmin && (
          <>
            <Link to={`/new-user`} className="guide-card-link">
              Nouvel utilisateur
            </Link>
          </>
        )}
        <div className="grid-cards">
        {userList.map((item) => (
            <div className="guide-card">
                <p>{item.email}</p>
                <p>{item.password}</p>
                <p>{item.rôle}</p>
                {/* Permet de naviguer vers la page du guide */}
                <button type="button" className="guide-card-link" onClick={handleDelete}>
                    Supprimer l'utilisateur
                </button>
            </div>
        ))}
        </div>
    </div>
  );
}

export default UserListPage;
