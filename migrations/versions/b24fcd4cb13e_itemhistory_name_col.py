"""ItemHistory name col

Revision ID: b24fcd4cb13e
Revises: 637c34073de2
Create Date: 2021-01-23 18:24:49.787239

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'b24fcd4cb13e'
down_revision = '637c34073de2'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_index('ix_item_history_name', table_name='item_history')
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_index('ix_item_history_name', 'item_history', ['name'], unique=1)
    # ### end Alembic commands ###