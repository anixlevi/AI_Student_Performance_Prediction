from pydantic import BaseModel


class PredictionInput(BaseModel):

    student_id: int