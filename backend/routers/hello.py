from fastapi import APIRouter

router = APIRouter(
    prefix="/hello"
)

@router.get("/fullstack")
async def get_hello():
    return {"hello": "fullstack"}