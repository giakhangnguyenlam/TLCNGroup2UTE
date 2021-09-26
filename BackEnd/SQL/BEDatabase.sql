USE [demobe]
GO
/****** Object:  Table [dbo].[user_entity]    Script Date: 25/09/2021 2:54:02 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[user_entity](
	[id] [int] NOT NULL,
	[dateofbirth] [datetime2](7) NULL,
	[email] [varchar](255) NULL,
	[gender] [varchar](255) NULL,
	[granted_authority] [varchar](255) NULL,
	[name] [varchar](255) NULL,
	[password] [varchar](255) NULL,
	[username] [varchar](255) NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
