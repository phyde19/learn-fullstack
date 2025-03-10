# Recipe Manager Backend API

This document outlines the backend API requirements needed to support the Recipe Manager frontend application.

## Database Models

### Recipe

```python
class Recipe(Base):
    __tablename__ = "recipes"

    id: Mapped[uuid.UUID] = mapped_column(primary_key=True, default=uuid.uuid4)
    title: Mapped[str] = mapped_column(String(100), nullable=False)
    description: Mapped[str] = mapped_column(Text, nullable=False)
    category: Mapped[str] = mapped_column(String(50), nullable=False)
    prep_time: Mapped[int] = mapped_column(Integer, nullable=False)
    cook_time: Mapped[int] = mapped_column(Integer, nullable=False)
    servings: Mapped[int] = mapped_column(Integer, nullable=False)
    image_url: Mapped[str] = mapped_column(String(255), nullable=True)
    notes: Mapped[str] = mapped_column(Text, nullable=True)
    created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)
    updated_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    author: Mapped[str] = mapped_column(String(100), nullable=True)

    # Relationships
    ingredients: Mapped[List["Ingredient"]] = relationship("Ingredient", back_populates="recipe", cascade="all, delete-orphan")
    instructions: Mapped[List["Instruction"]] = relationship("Instruction", back_populates="recipe", cascade="all, delete-orphan", order_by="Instruction.step_number")
```

### Ingredient

```python
class Ingredient(Base):
    __tablename__ = "ingredients"

    id: Mapped[uuid.UUID] = mapped_column(primary_key=True, default=uuid.uuid4)
    recipe_id: Mapped[uuid.UUID] = mapped_column(ForeignKey("recipes.id"))
    name: Mapped[str] = mapped_column(String(100), nullable=False)
    amount: Mapped[str] = mapped_column(String(50), nullable=False)

    # Relationship
    recipe: Mapped["Recipe"] = relationship("Recipe", back_populates="ingredients")
```

### Instruction

```python
class Instruction(Base):
    __tablename__ = "instructions"

    id: Mapped[uuid.UUID] = mapped_column(primary_key=True, default=uuid.uuid4)
    recipe_id: Mapped[uuid.UUID] = mapped_column(ForeignKey("recipes.id"))
    step_number: Mapped[int] = mapped_column(Integer, nullable=False)
    description: Mapped[str] = mapped_column(Text, nullable=False)

    # Relationship
    recipe: Mapped["Recipe"] = relationship("Recipe", back_populates="instructions")
```

## API Endpoints

### Recipes

#### GET /api/recipes
- **Description**: Get a list of all recipes
- **Query Parameters**:
  - `limit` (optional): Number of recipes to return (default: 50)
  - `offset` (optional): Number of recipes to skip (default: 0)
  - `category` (optional): Filter by category
  - `sort_by` (optional): Sort field (default: 'created_at')
  - `sort_dir` (optional): Sort direction ('asc' or 'desc', default: 'desc')
- **Response**: Array of recipe objects (without instructions and ingredients)

#### GET /api/recipes/featured
- **Description**: Get a list of featured recipes (e.g., newest or most popular)
- **Response**: Array of recipe objects (without instructions and ingredients)

#### GET /api/recipes/{id}
- **Description**: Get a specific recipe by ID
- **Response**: Complete recipe object with instructions and ingredients

#### POST /api/recipes
- **Description**: Create a new recipe
- **Request Body**: Recipe data
- **Response**: Created recipe object

#### PUT /api/recipes/{id}
- **Description**: Update an existing recipe
- **Request Body**: Updated recipe data
- **Response**: Updated recipe object

#### DELETE /api/recipes/{id}
- **Description**: Delete a recipe
- **Response**: Success message

### Search

#### POST /api/recipes/search
- **Description**: Search for recipes
- **Request Body**:
  - `query` (optional): Text to search in title and description
  - `ingredients` (optional): Array of ingredient names to filter by
  - `category` (optional): Category to filter by
- **Response**: Array of matching recipe objects

## Recipe Data Structure

### Recipe Object (full)
```json
{
  "id": "uuid-string",
  "title": "Recipe Title",
  "description": "Recipe description text",
  "category": "Category Name",
  "prep_time": 15,
  "cook_time": 30,
  "servings": 4,
  "image_url": "https://example.com/image.jpg",
  "notes": "Additional recipe notes",
  "created_at": "2025-03-01T12:00:00Z",
  "updated_at": "2025-03-02T12:00:00Z",
  "author": "Chef Name",
  "ingredients": [
    {
      "id": "uuid-string",
      "name": "Ingredient Name",
      "amount": "1 cup"
    }
  ],
  "instructions": [
    {
      "id": "uuid-string",
      "step_number": 1,
      "description": "Step description"
    }
  ]
}
```

### Recipe Object (list view)
```json
{
  "id": "uuid-string",
  "title": "Recipe Title",
  "description": "Recipe description text",
  "category": "Category Name",
  "prep_time": 15,
  "cook_time": 30,
  "image_url": "https://example.com/image.jpg",
  "created_at": "2025-03-01T12:00:00Z"
}
```

## Implementation Steps

1. Set up the database models with SQLAlchemy
2. Create Pydantic models for request/response validation
3. Implement CRUD operations for recipes
4. Add search functionality
5. Implement pagination and filtering
6. Set up error handling and validation
7. Add CORS configuration for frontend communication
8. Test the API endpoints

## Sample Code

### Pydantic Models

```python
from pydantic import BaseModel, Field
from typing import List, Optional
from uuid import UUID
from datetime import datetime

class IngredientBase(BaseModel):
    name: str
    amount: str

class IngredientCreate(IngredientBase):
    pass

class Ingredient(IngredientBase):
    id: UUID
    recipe_id: UUID

    class Config:
        orm_mode = True

class InstructionBase(BaseModel):
    step_number: int
    description: str

class InstructionCreate(InstructionBase):
    pass

class Instruction(InstructionBase):
    id: UUID
    recipe_id: UUID

    class Config:
        orm_mode = True

class RecipeBase(BaseModel):
    title: str
    description: str
    category: str
    prep_time: int
    cook_time: int
    servings: int
    image_url: Optional[str] = None
    notes: Optional[str] = None
    author: Optional[str] = None

class RecipeCreate(RecipeBase):
    ingredients: List[IngredientCreate]
    instructions: List[InstructionCreate]

class RecipeUpdate(RecipeBase):
    ingredients: List[IngredientCreate]
    instructions: List[InstructionCreate]

class Recipe(RecipeBase):
    id: UUID
    created_at: datetime
    updated_at: datetime
    ingredients: List[Ingredient]
    instructions: List[Instruction]

    class Config:
        orm_mode = True

class RecipeList(BaseModel):
    id: UUID
    title: str
    description: str
    category: str
    prep_time: int
    cook_time: int
    image_url: Optional[str] = None
    created_at: datetime

    class Config:
        orm_mode = True

class SearchRequest(BaseModel):
    query: Optional[str] = None
    ingredients: Optional[List[str]] = None
    category: Optional[str] = None
```

## Router Example

```python
from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.ext.asyncio import AsyncSession
from typing import List, Optional
from uuid import UUID

from db.dependencies import get_db
from models import Recipe, RecipeCreate, RecipeUpdate, RecipeList

router = APIRouter(prefix="/api/recipes")

@router.get("/", response_model=List[RecipeList])
async def get_recipes(
    db: AsyncSession = Depends(get_db),
    limit: int = Query(50, ge=1, le=100),
    offset: int = Query(0, ge=0),
    category: Optional[str] = None,
    sort_by: str = "created_at",
    sort_dir: str = "desc"
):
    """Get a list of recipes with optional filtering and sorting"""
    # Implementation goes here

@router.get("/featured", response_model=List[RecipeList])
async def get_featured_recipes(db: AsyncSession = Depends(get_db)):
    """Get a list of featured recipes"""
    # Implementation goes here

@router.get("/{recipe_id}", response_model=Recipe)
async def get_recipe(recipe_id: UUID, db: AsyncSession = Depends(get_db)):
    """Get a specific recipe by ID"""
    # Implementation goes here

@router.post("/", response_model=Recipe, status_code=201)
async def create_recipe(recipe: RecipeCreate, db: AsyncSession = Depends(get_db)):
    """Create a new recipe"""
    # Implementation goes here

@router.put("/{recipe_id}", response_model=Recipe)
async def update_recipe(recipe_id: UUID, recipe: RecipeUpdate, db: AsyncSession = Depends(get_db)):
    """Update an existing recipe"""
    # Implementation goes here

@router.delete("/{recipe_id}", status_code=204)
async def delete_recipe(recipe_id: UUID, db: AsyncSession = Depends(get_db)):
    """Delete a recipe"""
    # Implementation goes here

@router.post("/search", response_model=List[RecipeList])
async def search_recipes(search_params: SearchRequest, db: AsyncSession = Depends(get_db)):
    """Search for recipes"""
    # Implementation goes here
```

Good luck with your implementation!