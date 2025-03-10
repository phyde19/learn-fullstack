from sqlalchemy import String, Integer, Text, DateTime, text, insert
from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column, Session
from sqlalchemy.types import Uuid
from datetime import datetime
import uuid

from db.dependencies import engine, get_session

class Base(DeclarativeBase):
    pass

# class Entity(Base):
#     __tablename__ = "entity"

#     id: Mapped[uuid.UUID] = mapped_column(primary_key=True)
#     name: Mapped[str] = mapped_column(String(64), nullable=False)

class Post(Base):
    __tablename__ = "post"

    id: Mapped[uuid.UUID] = mapped_column(Uuid, primary_key=True)
    title: Mapped[str] = mapped_column(String(64), nullable=False)
    content: Mapped[str] = mapped_column(Text, nullable=False)
    created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.now)

    def __repr__(self):
        return f"Post(id={self.id}, title={self.title}, content={self.content}, created_at={self.created_at})"


def init_db_and_tables():
    # DROP untracked tables
    # with engine.connect() as conn:
    #     conn.execute(text("DROP SCHEMA public CASCADE;"))
    #     conn.execute(text("CREATE SCHEMA public;"))
    #     conn.commit()  # Commit changes
    Base.metadata.drop_all(engine)
    Base.metadata.create_all(engine)
    seed_posts()


def seed_posts():
    session = next(get_session())
    session.execute(insert(Post), [
        {"id": uuid.uuid4(), "title": "To ORM or not to ORM?", "content": "This is a deep dive into sqlalchemy.."},
        {"id": uuid.uuid4(), "title": "Why MCP isn't anything new", "content": "Claude Code put MCP on the map. But what.."}
    ])
    session.commit()
