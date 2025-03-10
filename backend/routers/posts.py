from fastapi import APIRouter
from pydantic import BaseModel
from sqlalchemy import select, update, insert, delete
import uuid

from db.models import Post
from db.dependencies import SessionDep

router = APIRouter(
    prefix="/posts"
)

class PostCreate(BaseModel):
    title: str
    content: str

@router.post("")
async def create_post(post: PostCreate, session: SessionDep):
    new_post = {
        "id": uuid.uuid4(),
        **post.model_dump()
    }
    session.execute(insert(Post).values(new_post))
    session.commit()
    return new_post

@router.get("")
async def read_posts(session: SessionDep):
    posts = session.execute(select(Post).order_by(Post.created_at)).scalars().all()
    return posts


@router.get("/{id}")
async def read_post_by_id(id: uuid.UUID, session: SessionDep):
    return session.execute(select(Post).where(Post.id == id)).scalars().first()


class PostUpdate(BaseModel):
    title: str | None = None
    content: str | None = None

@router.put("/{id}")
async def update_post_by_id(id: uuid.UUID, post: PostUpdate, session: SessionDep):
    post_dict = post.model_dump(exclude_none=True)
    stmt = (
        update(Post)
            .where(Post.id == id)
            .values(**post_dict)
    )
    session.execute(stmt)
    session.commit()
    return {"message": "post updated successfully"}

@router.delete("/{id}")
async def delete_post_by_id(id: uuid.UUID, session: SessionDep):
    session.execute(delete(Post).where(Post.id == id))
    session.commit()
    return {"message": "post deleted successfully"}