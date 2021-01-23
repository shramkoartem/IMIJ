"""ItemHistory table

Revision ID: b09481414bf3
Revises: b055c6637249
Create Date: 2021-01-23 17:09:54.068494

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'b09481414bf3'
down_revision = 'b055c6637249'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('item_history',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('barcode', sa.Integer(), nullable=True),
    sa.Column('cost', sa.Float(), nullable=True),
    sa.Column('amount', sa.Integer(), nullable=True),
    sa.Column('price', sa.Float(), nullable=True),
    sa.Column('timestamp', sa.DateTime(), server_default=sa.text('(CURRENT_TIMESTAMP)'), nullable=True),
    sa.Column('transaction_type', sa.String(length=100), nullable=True),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_index(op.f('ix_item_history_barcode'), 'item_history', ['barcode'], unique=True)
    op.add_column('item', sa.Column('cost', sa.Float(), nullable=True))
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('item', 'cost')
    op.drop_index(op.f('ix_item_history_barcode'), table_name='item_history')
    op.drop_table('item_history')
    # ### end Alembic commands ###
