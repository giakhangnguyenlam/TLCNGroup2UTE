USE [demobe]
GO
/****** Object:  Table [dbo].[category_accessories]    Script Date: 11/10/2021 10:10:23 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[category_accessories](
	[id] [int] NOT NULL,
	[brand] [varchar](255) NULL,
	[material] [varchar](255) NULL,
	[origin] [varchar](255) NULL,
	[product_id] [int] NOT NULL,
	[type] [varchar](255) NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[category_accessories_entity_color]    Script Date: 11/10/2021 10:10:23 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[category_accessories_entity_color](
	[category_accessories_entity_id] [int] NOT NULL,
	[color] [varchar](255) NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[category_accessories_entity_size]    Script Date: 11/10/2021 10:10:23 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[category_accessories_entity_size](
	[category_accessories_entity_id] [int] NOT NULL,
	[size] [varchar](255) NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[category_clothes]    Script Date: 11/10/2021 10:10:23 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[category_clothes](
	[id] [int] NOT NULL,
	[brand] [varchar](255) NULL,
	[gender] [varchar](255) NULL,
	[material] [varchar](255) NULL,
	[origin] [varchar](255) NULL,
	[product_id] [varchar](255) NULL,
	[type] [varchar](255) NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[category_clothes_entity_color]    Script Date: 11/10/2021 10:10:23 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[category_clothes_entity_color](
	[category_clothes_entity_id] [int] NOT NULL,
	[color] [varchar](255) NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[category_clothes_entity_size]    Script Date: 11/10/2021 10:10:23 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[category_clothes_entity_size](
	[category_clothes_entity_id] [int] NOT NULL,
	[size] [varchar](255) NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[category_shoes]    Script Date: 11/10/2021 10:10:23 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[category_shoes](
	[id] [int] NOT NULL,
	[gender] [varchar](255) NULL,
	[height] [float] NOT NULL,
	[material] [varchar](255) NULL,
	[origin] [varchar](255) NULL,
	[product_id] [int] NOT NULL,
	[sole] [varchar](255) NULL,
	[style] [varchar](255) NULL,
	[warranty] [float] NOT NULL,
	[weight] [float] NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[category_shoes_entity_color]    Script Date: 11/10/2021 10:10:23 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[category_shoes_entity_color](
	[category_shoes_entity_id] [int] NOT NULL,
	[color] [varchar](255) NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[category_shoes_entity_size]    Script Date: 11/10/2021 10:10:23 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[category_shoes_entity_size](
	[category_shoes_entity_id] [int] NOT NULL,
	[size] [varchar](255) NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[comment]    Script Date: 11/10/2021 10:10:23 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[comment](
	[id] [int] NOT NULL,
	[comment] [varchar](255) NULL,
	[date] [datetime2](7) NULL,
	[product_id] [int] NOT NULL,
	[start] [int] NOT NULL,
	[username] [varchar](255) NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[order_detail]    Script Date: 11/10/2021 10:10:23 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[order_detail](
	[id] [int] NOT NULL,
	[order_id] [int] NOT NULL,
	[product_id] [int] NOT NULL,
	[quantity] [int] NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[product]    Script Date: 11/10/2021 10:10:23 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[product](
	[id] [int] NOT NULL,
	[category] [int] NOT NULL,
	[description] [varchar](255) NULL,
	[image] [varchar](255) NULL,
	[name] [varchar](255) NULL,
	[price] [float] NOT NULL,
	[quantity] [int] NOT NULL,
	[store_id] [int] NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[store]    Script Date: 11/10/2021 10:10:23 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[store](
	[id] [int] NOT NULL,
	[image] [varchar](255) NULL,
	[name_store] [varchar](255) NULL,
	[store_description] [varchar](255) NULL,
	[user_id] [int] NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
ALTER TABLE [dbo].[category_accessories_entity_color]  WITH CHECK ADD  CONSTRAINT [FKj5vhg3uqgof8x5ghh2l6u6hxo] FOREIGN KEY([category_accessories_entity_id])
REFERENCES [dbo].[category_accessories] ([id])
GO
ALTER TABLE [dbo].[category_accessories_entity_color] CHECK CONSTRAINT [FKj5vhg3uqgof8x5ghh2l6u6hxo]
GO
ALTER TABLE [dbo].[category_accessories_entity_size]  WITH CHECK ADD  CONSTRAINT [FKsj9lkpejk6egsls2sbfvn068q] FOREIGN KEY([category_accessories_entity_id])
REFERENCES [dbo].[category_accessories] ([id])
GO
ALTER TABLE [dbo].[category_accessories_entity_size] CHECK CONSTRAINT [FKsj9lkpejk6egsls2sbfvn068q]
GO
ALTER TABLE [dbo].[category_clothes_entity_color]  WITH CHECK ADD  CONSTRAINT [FK91ow871vfgc4ew7qqo4cu7x6f] FOREIGN KEY([category_clothes_entity_id])
REFERENCES [dbo].[category_clothes] ([id])
GO
ALTER TABLE [dbo].[category_clothes_entity_color] CHECK CONSTRAINT [FK91ow871vfgc4ew7qqo4cu7x6f]
GO
ALTER TABLE [dbo].[category_clothes_entity_size]  WITH CHECK ADD  CONSTRAINT [FK3y6g89feyqfq6y8e83otvb135] FOREIGN KEY([category_clothes_entity_id])
REFERENCES [dbo].[category_clothes] ([id])
GO
ALTER TABLE [dbo].[category_clothes_entity_size] CHECK CONSTRAINT [FK3y6g89feyqfq6y8e83otvb135]
GO
ALTER TABLE [dbo].[category_shoes_entity_color]  WITH CHECK ADD  CONSTRAINT [FKf9cdjuv1rkggxdo5xnetlgc7u] FOREIGN KEY([category_shoes_entity_id])
REFERENCES [dbo].[category_shoes] ([id])
GO
ALTER TABLE [dbo].[category_shoes_entity_color] CHECK CONSTRAINT [FKf9cdjuv1rkggxdo5xnetlgc7u]
GO
ALTER TABLE [dbo].[category_shoes_entity_size]  WITH CHECK ADD  CONSTRAINT [FKou51tbmq7d0rgkdgdd7w72geu] FOREIGN KEY([category_shoes_entity_id])
REFERENCES [dbo].[category_shoes] ([id])
GO
ALTER TABLE [dbo].[category_shoes_entity_size] CHECK CONSTRAINT [FKou51tbmq7d0rgkdgdd7w72geu]
GO
